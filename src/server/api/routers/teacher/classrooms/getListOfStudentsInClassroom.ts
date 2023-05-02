import { TRPCError } from "@trpc/server";
import {
  TRPC_ERROR_CODES_BY_NUMBER,
  TRPC_ERROR_CODES_BY_KEY,
} from "@trpc/server/rpc";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const querySchema = z.object({
  pageNumber: z.number().int().min(1),
  skip: z.number().optional(),
  pageSize: z.number().min(1),
  classroomId: z.string().nonempty(),
});

export const getListOfStudentsInClassroom = createTRPCRouter({
  get: publicProcedure.input(querySchema).query(async ({ input, ctx }) => {
    const startIndex = (input.pageNumber - 1) * input.pageSize;

    const classroomToGetStudents = await ctx.prisma.classroom.findFirst({
      where: {
        id: input.classroomId,
        teacherProfile: {
          userId: ctx.session?.user.id,
        },
      },
    });

    if (!classroomToGetStudents)
      throw new TRPCError({
        code: TRPC_ERROR_CODES_BY_NUMBER[TRPC_ERROR_CODES_BY_KEY.FORBIDDEN],
        message: "Can not modify this classroom.",
      });

    const count = await ctx.prisma.studentProfile.count({
      where: {
        classrooms: {
          some: {
            id: input.classroomId,
          },
        },
      },
    });

    const totalPages = Math.ceil(count / input.pageSize);

    const students = await ctx.prisma.studentProfile.findMany({
      where: {
        classrooms: {
          some: {
            id: input.classroomId,
          },
        },
      },
      skip: startIndex,
      take: input.pageSize,
      orderBy: {
        firstName: "asc",
      },
    });

    const hasPreviousPage = startIndex > 0;
    const hasNextPage = startIndex + input.pageSize < count;

    return {
      items: students,
      totalPages,
      hasPreviousPage,
      hasNextPage,
    };
  }),
});
