import { createTRPCRouter } from "~/server/api/trpc";
import { signUp } from "./signUp";

export const authRouter = createTRPCRouter({
  signUp,
});
