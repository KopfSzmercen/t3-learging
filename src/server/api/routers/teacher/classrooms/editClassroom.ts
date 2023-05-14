import { TRPCError } from "@trpc/server";
import {
  TRPC_ERROR_CODES_BY_KEY,
  TRPC_ERROR_CODES_BY_NUMBER,
} from "@trpc/server/rpc";
import { z } from "zod";
import { NotFoundError } from "~/server/api/errors/notFound.error";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const mutationSchema = z.object({
  name: z.string().nonempty(),
  maxNumberOfStudents: z.number().int().min(1),
  classroomId: z.string().nonempty(),
});

export const editClassroom = createTRPCRouter({
  edit: publicProcedure
    .input(mutationSchema)
    .mutation(async ({ input, ctx }) => {
      const classroom = await ctx.prisma.classroom.findFirst({
        where: {
          id: input.classroomId,
          teacherProfile: {
            userId: ctx.session?.user.id,
          },
        },
        select: {
          id: true,
          _count: {
            select: {
              students: true,
            },
          },
        },
      });

      if (!classroom) throw NotFoundError("Classroom not found.");

      if (classroom?._count.students > input.maxNumberOfStudents)
        throw new TRPCError({
          code: TRPC_ERROR_CODES_BY_NUMBER[TRPC_ERROR_CODES_BY_KEY.NOT_FOUND],
          message:
            "Can not set max number of students if it is less than the current number of students in the classroom.",
        });

      await ctx.prisma.classroom.update({
        where: {
          id: input.classroomId,
        },
        data: {
          name: input.name,
          maxNumberOfStudents: input.maxNumberOfStudents,
        },
      });

      return input.classroomId;
    }),
});
