import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const querySchema = z.object({
  pageNumber: z.number().int().min(1),
  skip: z.number().optional(),
  pageSize: z.number().min(1),
});

export const getOwnedClassrooms = createTRPCRouter({
  get: publicProcedure.input(querySchema).query(async ({ input, ctx }) => {
    const startIndex = (input.pageNumber - 1) * input.pageSize;

    const count = await ctx.prisma.classroom.count({
      where: {
        teacherProfile: {
          userId: ctx.session?.user.id,
        },
      },
    });

    const totalPages = Math.ceil(count / input.pageSize);

    const teachingSubjects = await ctx.prisma.classroom.findMany({
      where: {
        teacherProfile: {
          userId: ctx.session?.user.id,
        },
      },
      skip: startIndex,
      take: input.pageSize,
      orderBy: {
        name: "asc",
      },
    });

    const hasPreviousPage = startIndex > 0;
    const hasNextPage = startIndex + input.pageSize < count;

    return {
      items: teachingSubjects,
      totalPages,
      hasPreviousPage,
      hasNextPage,
    };
  }),
});
