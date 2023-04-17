import { DEGREE } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";
import {
  TRPC_ERROR_CODES_BY_NUMBER,
  TRPC_ERROR_CODES_BY_KEY,
} from "@trpc/server/rpc";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const mutationSchema = z.object({
  name: z.string().nonempty(),
  degree: z.nativeEnum(DEGREE),
  almaMater: z.string().nonempty(),
});

export const addTeachingSubject = createTRPCRouter({
  addTeachingSubject: publicProcedure
    .input(mutationSchema)
    .mutation(async ({ input, ctx }) => {
      const userTeachingSubjectWithSameNameCount =
        await ctx.prisma.teachingSubject.count({
          where: {
            name: input.name,
            teacherProfile: {
              userId: ctx.session?.user.id,
            },
          },
        });

      if (userTeachingSubjectWithSameNameCount > 0)
        throw new TRPCError({
          code: TRPC_ERROR_CODES_BY_NUMBER[TRPC_ERROR_CODES_BY_KEY.CONFLICT],
          message:
            "You already have this subject in Your teaching subjects list.",
        });

      try {
        await ctx.prisma.teacherProfile.update({
          where: {
            userId: ctx.session?.user.id,
          },
          data: {
            teachingSubjects: {
              create: {
                ...input,
              },
            },
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
