import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const querySchema = z.object({
  userId: z.string(),
});

export const getTeachingSubjects = createTRPCRouter({
  getTeachingSubjects: publicProcedure
    .input(querySchema)
    .query(async ({ input, ctx }) => {
      const teachingSubjects = await ctx.prisma.teachingSubject.findMany({
        where: {
          teacherProfile: {
            userId: input.userId,
          },
        },
      });
      return teachingSubjects;
    }),
});
