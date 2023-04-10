import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  TRPC_ERROR_CODES_BY_NUMBER,
  TRPC_ERROR_CODES_BY_KEY,
} from "@trpc/server/rpc";

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

      if (teacherProfile === null)
        throw new TRPCError({
          code: TRPC_ERROR_CODES_BY_NUMBER[TRPC_ERROR_CODES_BY_KEY.NOT_FOUND],
          message: "Profile for user not found",
        });

      return teacherProfile;
    }),
});
