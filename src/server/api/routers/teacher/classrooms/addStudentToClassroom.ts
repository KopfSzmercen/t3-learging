import { TRPCError } from "@trpc/server";
import {
  TRPC_ERROR_CODES_BY_NUMBER,
  TRPC_ERROR_CODES_BY_KEY,
} from "@trpc/server/rpc";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const mutationSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  classroomId: z.string().nonempty(),
});

export const addStudentToClassroom = createTRPCRouter({
  add: publicProcedure
    .input(mutationSchema)
    .mutation(async ({ input, ctx }) => {
      const classroomToAddStudent = await ctx.prisma.classroom.findFirst({
        where: {
          id: input.classroomId,
          teacherProfile: {
            userId: ctx.session?.user.id,
          },
        },
        select: {
          id: true,
          maxNumberOfStudents: true,
          _count: {
            select: {
              students: true,
            },
          },
        },
      });

      if (!classroomToAddStudent)
        throw new TRPCError({
          code: TRPC_ERROR_CODES_BY_NUMBER[TRPC_ERROR_CODES_BY_KEY.FORBIDDEN],
          message: "Can not modify this classroom.",
        });

      if (
        classroomToAddStudent._count.students + 1 >
        classroomToAddStudent.maxNumberOfStudents
      )
        throw new TRPCError({
          code: TRPC_ERROR_CODES_BY_NUMBER[TRPC_ERROR_CODES_BY_KEY.BAD_REQUEST],
          message: "Can not add more students than allowed.",
        });

      const newStudent = await ctx.prisma.studentProfile.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          classrooms: {
            connect: {
              id: input.classroomId,
            },
          },
        },
      });

      return newStudent.id;
    }),
});
