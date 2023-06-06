import { z } from "zod";
import { NotFoundError } from "~/server/api/errors/notFound.error";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const mutationSchema = z.object({
  studentId: z.string().nonempty(),
  gradeId: z.string().nonempty(),
});

export const deleteStudentGrade = createTRPCRouter({
  delete: publicProcedure
    .input(mutationSchema)
    .mutation(async ({ input, ctx }) => {
      const studentWithGrade = await ctx.prisma.studentProfile.findFirst({
        where: {
          id: input.studentId,
          classrooms: {
            some: {
              teacherProfile: {
                userId: ctx.session?.user.id,
              },
            },
          },
          receivedGrades: {
            some: {
              id: input.gradeId,
            },
          },
        },
      });

      if (!studentWithGrade) throw NotFoundError("Student not found");

      await ctx.prisma.grade.deleteMany({
        where: {
          id: input.gradeId,
          studentProfileId: studentWithGrade.id,
        },
      });

      return studentWithGrade.id;
    }),
});
