import { authRouter } from "~/server/api/routers/auth/authRouter";
import { exampleRouter } from "~/server/api/routers/example";
import { teacherRouter } from "~/server/api/routers/teacher/teacher.router";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  teacher: teacherRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
