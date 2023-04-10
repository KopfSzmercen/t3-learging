import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";
import {
  TRPC_ERROR_CODES_BY_NUMBER,
  TRPC_ERROR_CODES_BY_KEY,
} from "@trpc/server/rpc";
import { z } from "zod";
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
          throw new TRPCError({
            code: TRPC_ERROR_CODES_BY_NUMBER[TRPC_ERROR_CODES_BY_KEY.NOT_FOUND],
            message: "Profile for user not found",
          });
        throw e;
      }
    }),
});
