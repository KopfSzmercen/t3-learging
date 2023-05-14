import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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

    return student;
  }),
});
