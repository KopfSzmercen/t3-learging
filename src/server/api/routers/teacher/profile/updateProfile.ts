import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { z } from "zod";
import { NotFoundError } from "~/server/api/errors/notFound.error";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const mutationSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  dateOfBirth: z.date(),
});

export const updateTeacherProfile = createTRPCRouter({
  getTeacherProfile: publicProcedure
    .input(mutationSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.teacherProfile.update({
          where: {
            userId: ctx.session?.user.id,
          },
          data: {
            ...input,
          },
        });
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError)
          throw NotFoundError("Profile not found.");
        throw e;
      }
    }),
});
