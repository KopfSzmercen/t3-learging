import { z } from "zod";
import { NotFoundError } from "~/server/api/errors/notFound.error";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const querySchema = z.object({
  userId: z.string(),
});

export const getTeacherProfile = createTRPCRouter({
  getTeacherProfile: publicProcedure
    .input(querySchema)
    .query(async ({ input, ctx }) => {
      const teacherProfile = await ctx.prisma.teacherProfile.findUnique({
        where: {
          userId: input.userId,
        },
        select: {
          dateOfBirth: true,
          firstName: true,
          lastName: true,
        },
      });

      if (teacherProfile === null) throw NotFoundError("Profile not found.");

      return teacherProfile;
    }),
});
