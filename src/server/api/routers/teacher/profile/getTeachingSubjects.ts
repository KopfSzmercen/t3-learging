import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const getTeachingSubjects = createTRPCRouter({
  getTeachingSubjects: publicProcedure.query(async ({ ctx }) => {
    const teachingSubjects = await ctx.prisma.teachingSubject.findMany({
      where: {
        teacherProfile: {
          userId: ctx.session?.user.id,
        },
      },
    });
    return teachingSubjects;
  }),
});
