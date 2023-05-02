import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const mutationSchema = z.object({
  name: z.string().nonempty(),
  numberOfStudents: z.number().int().min(1),
});

export const addClassroom = createTRPCRouter({
  add: publicProcedure
    .input(mutationSchema)
    .mutation(async ({ input, ctx }) => {
      const newClassroom = await ctx.prisma.classroom.create({
        data: {
          name: input.name,
          maxNumberOfStudents: input.numberOfStudents,
          teacherProfile: {
            connect: {
              userId: ctx.session?.user.id,
            },
          },
        },
      });

      return newClassroom.id;
    }),
});
