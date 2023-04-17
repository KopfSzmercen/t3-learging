import { addClassroom } from "~/server/api/routers/teacher/classrooms/addClassroom";
import { getOwnedClassrooms } from "~/server/api/routers/teacher/classrooms/getClassrooms";
import { addTeachingSubject } from "~/server/api/routers/teacher/profile/addTeachingSubject";
import { getTeacherProfile } from "~/server/api/routers/teacher/profile/getProfile";
import { getTeachingSubjects } from "~/server/api/routers/teacher/profile/getTeachingSubjects";
import { removeTeachingSubject } from "~/server/api/routers/teacher/profile/removeTeachingSubject";
import { updateTeacherProfile } from "~/server/api/routers/teacher/profile/updateProfile";
import { createTRPCRouter } from "~/server/api/trpc";

export const teacherRouter = createTRPCRouter({
  getTeacherProfile,
  updateTeacherProfile,
  getTeachingSubjects,
  addTeachingSubject,
  removeTeachingSubject,
  getOwnedClassrooms,
  addClassroom,
});
