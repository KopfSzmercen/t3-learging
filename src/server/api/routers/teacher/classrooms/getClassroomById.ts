import { z } from "zod";
import { NotFoundError } from "~/server/api/errors/notFound.error";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const querySchema = z.object({
  classroomId: z.string().nonempty(),
});

export const getClassrromById = createTRPCRouter({
  get: publicProcedure.input(querySchema).query(async ({ input, ctx }) => {
    const classroom = await ctx.prisma.classroom.findFirst({
      where: {
        id: input.classroomId,
        teacherProfile: {
          userId: ctx.session?.user.id,
        },
      },
    });

    if (classroom === null) throw NotFoundError("Classroom not found.");

    return classroom;
  }),
});
