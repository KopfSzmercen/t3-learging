import { TRPCError } from "@trpc/server";
import {
  TRPC_ERROR_CODES_BY_NUMBER,
  TRPC_ERROR_CODES_BY_KEY,
} from "@trpc/server/rpc";
import { z } from "zod";
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

    if (classroom === null)
      throw new TRPCError({
        code: TRPC_ERROR_CODES_BY_NUMBER[TRPC_ERROR_CODES_BY_KEY.NOT_FOUND],
        message: "Classrom not found",
      });

    return classroom;
  }),
});
