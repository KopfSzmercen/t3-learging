import { DEGREE } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { z } from "zod";
import { ConflictError } from "~/server/api/errors/conflict.error";
import { NotFoundError } from "~/server/api/errors/notFound.error";
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
        throw ConflictError(
          "Subject with the same name is already in your list."
        );

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
          throw NotFoundError("Profile not found.");
        throw e;
      }
    }),
});
