import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const mutationSchema = z.object({
  teachinSubjectId: z.string(),
});

export const removeTeachingSubject = createTRPCRouter({
  remove: publicProcedure
    .input(mutationSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.teacherProfile.update({
        where: {
          userId: ctx.session?.user.id,
        },
        data: {
          teachingSubjects: {
            delete: {
              id: input.teachinSubjectId,
            },
          },
        },
      });

      return ctx.session?.user.id;
    }),
});
