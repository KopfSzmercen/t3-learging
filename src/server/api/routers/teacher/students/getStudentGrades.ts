import { z } from "zod";
import { NotFoundError } from "~/server/api/errors/notFound.error";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PaginationHelper } from "~/server/utils/paginationHelper";

const querySchema = z.object({
  studentId: z.string().nonempty(),
  pageNumber: z.number().int().min(1),
  pageSize: z.number().min(1),
});

export const getStudentGrades = createTRPCRouter({
  get: publicProcedure.input(querySchema).query(async ({ input, ctx }) => {
    const student = await ctx.prisma.studentProfile.findFirst({
      where: {
        id: input.studentId,
        classrooms: {
          some: {
            teacherProfile: {
              userId: ctx.session?.user.id,
            },
          },
        },
      },
    });

    if (!student) throw NotFoundError("Student not found.");

    const count = await ctx.prisma.grade.count({
      where: {
        studentProfile: {
          id: student.id,
        },
      },
    });

    const paginationHelper = new PaginationHelper({
      count,
      pageSize: input.pageSize,
      pageNumber: input.pageNumber,
    });

    const grades = await ctx.prisma.grade.findMany({
      where: {
        studentProfileId: student.id,
      },
      skip: paginationHelper.startIndex,
      take: input.pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      items: grades,
      totalPages: paginationHelper.totalPages,
      hasPreviousPage: paginationHelper.hasPreviousPage,
      hasNextPage: paginationHelper.hasNextPage,
    };
  }),
});
