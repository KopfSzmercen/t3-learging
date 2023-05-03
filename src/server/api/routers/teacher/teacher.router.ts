import { addClassroom } from "~/server/api/routers/teacher/classrooms/addClassroom";
import { addStudentToClassroom } from "~/server/api/routers/teacher/classrooms/addStudentToClassroom";
import { editClassroom } from "~/server/api/routers/teacher/classrooms/editClassroom";
import { getClassrromById } from "~/server/api/routers/teacher/classrooms/getClassroomById";
import { getOwnedClassrooms } from "~/server/api/routers/teacher/classrooms/getClassrooms";
import { getListOfStudentsInClassroom } from "~/server/api/routers/teacher/classrooms/getListOfStudentsInClassroom";
import { addTeachingSubject } from "~/server/api/routers/teacher/profile/addTeachingSubject";
import { getTeacherProfile } from "~/server/api/routers/teacher/profile/getProfile";
import { getTeachingSubjects } from "~/server/api/routers/teacher/profile/getTeachingSubjects";
import { removeTeachingSubject } from "~/server/api/routers/teacher/profile/removeTeachingSubject";
import { updateTeacherProfile } from "~/server/api/routers/teacher/profile/updateProfile";
import { addStudentGrade } from "~/server/api/routers/teacher/students/addStudentGrade";
import { getStudent } from "~/server/api/routers/teacher/students/getStudent";
import { getStudentGrades } from "~/server/api/routers/teacher/students/getStudentGrades";
import { createTRPCRouter } from "~/server/api/trpc";

export const teacherRouter = createTRPCRouter({
  getTeacherProfile,
  updateTeacherProfile,
  getTeachingSubjects,
  addTeachingSubject,
  removeTeachingSubject,
  getOwnedClassrooms,
  addClassroom,
  getClassrromById,
  editClassroom,
  addStudentToClassroom,
  getListOfStudentsInClassroom,
  getStudent,
  addStudentGrade,
  getStudentGrades,
});
