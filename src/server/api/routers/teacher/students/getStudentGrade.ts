import { z } from "zod";
import { NotFoundError } from "~/server/api/errors/notFound.error";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const querySchema = z.object({
  studentId: z.string().nonempty(),
  gradeId: z.string().nonempty(),
});

export const getStudentGradeById = createTRPCRouter({
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

    if (!student) throw NotFoundError("Student not found.");

    const grade = await ctx.prisma.grade.findFirst({
      where: {
        studentProfileId: input.studentId,
        id: input.gradeId,
      },
    });

    if (!grade) throw NotFoundError("Grade not found.");
    return grade;
  }),
});
