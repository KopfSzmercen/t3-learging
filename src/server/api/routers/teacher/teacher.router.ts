import { getTeacherProfile } from "~/server/api/routers/teacher/profile/getProfile";
import { updateTeacherProfile } from "~/server/api/routers/teacher/profile/updateProfile";
import { createTRPCRouter } from "~/server/api/trpc";

export const teacherRouter = createTRPCRouter({
  getTeacherProfile,
  updateTeacherProfile,
});
