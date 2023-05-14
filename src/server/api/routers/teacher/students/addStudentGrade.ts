import { GRADE_SCALE } from "@prisma/client";
import { z } from "zod";
import { NotFoundError } from "~/server/api/errors/notFound.error";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const gradeScalesStringArrayFromEnum = Object.keys(GRADE_SCALE);

const mutationSchema = z.object({
  subjectId: z.string().nonempty(),
  scale: z
    .string()
    .refine((scale) => gradeScalesStringArrayFromEnum.includes(scale)),
  description: z.string().optional(),
  studentId: z.string().nonempty(),
});

export const addStudentGrade = createTRPCRouter({
  add: publicProcedure
    .input(mutationSchema)
    .mutation(async ({ input, ctx }) => {
      const subjectInTeacherTeachingSubjects =
        await ctx.prisma.teachingSubject.findFirst({
          where: {
            id: input.subjectId,
            teacherProfile: {
              userId: ctx.session?.user.id,
            },
          },
        });

      if (!subjectInTeacherTeachingSubjects)
        throw NotFoundError("Teaching subject not found.");

      const studentToAddGrades = await ctx.prisma.studentProfile.findFirst({
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

      if (!studentToAddGrades) throw NotFoundError("Student not found");

      const newGrade = await ctx.prisma.grade.create({
        data: {
          description: input.description,
          subjectName: subjectInTeacherTeachingSubjects.name,
          value: input.scale as GRADE_SCALE,
          studentProfile: {
            connect: {
              id: studentToAddGrades.id,
            },
          },
          teacherProfile: {
            connect: {
              userId: ctx.session?.user.id,
            },
          },
        },
      });

      return newGrade.id;
    }),
});
