import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  TRPC_ERROR_CODES_BY_NUMBER,
  TRPC_ERROR_CODES_BY_KEY,
} from "@trpc/server/rpc";

const querySchema = z.object({
  studentId: z.string().nonempty(),
  pageNumber: z.number().int().min(1),
  skip: z.number().optional(),
  pageSize: z.number().min(1),
});

export const getStudentGrades = createTRPCRouter({
  get: publicProcedure.input(querySchema).query(async ({ input, ctx }) => {
    const student = await ctx.prisma.studentProfile.findFirst({
      where: {
        id: input.studentId,
        classrooms: {
          some: {
            teacherProfile: {
              userId: ctx.session?.user.id,
            },
          },
        },
      },
    });

    if (!student)
      throw new TRPCError({
        code: TRPC_ERROR_CODES_BY_NUMBER[TRPC_ERROR_CODES_BY_KEY.NOT_FOUND],
        message: "Student",
      });

    const count = await ctx.prisma.grade.count({
      where: {
        studentProfile: {
          id: student.id,
        },
      },
    });

    const startIndex = (input.pageNumber - 1) * input.pageSize;
    const totalPages = Math.ceil(count / input.pageSize);

    const grades = await ctx.prisma.grade.findMany({
      where: {
        studentProfileId: student.id,
      },
      skip: startIndex,
      take: input.pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });

    const hasPreviousPage = startIndex > 0;
    const hasNextPage = startIndex + input.pageSize < count;

    return {
      items: grades,
      totalPages,
      hasPreviousPage,
      hasNextPage,
    };
  }),
});
