import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  TRPC_ERROR_CODES_BY_NUMBER,
  TRPC_ERROR_CODES_BY_KEY,
} from "@trpc/server/rpc";

const querySchema = z.object({
  studentId: z.string().nonempty(),
});

export const getStudent = createTRPCRouter({
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
      include: {
        _count: {
          select: {
            receivedGrades: true,
          },
        },
      },
    });

    if (!student)
      throw new TRPCError({
        code: TRPC_ERROR_CODES_BY_NUMBER[TRPC_ERROR_CODES_BY_KEY.NOT_FOUND],
        message: "Student",
      });

    return student;
  }),
});
