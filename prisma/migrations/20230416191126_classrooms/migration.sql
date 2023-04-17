-- DropForeignKey
ALTER TABLE "Classroom" DROP CONSTRAINT "Classroom_userId_fkey";

-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "teacherProfileId" TEXT;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_teacherProfileId_fkey" FOREIGN KEY ("teacherProfileId") REFERENCES "TeacherProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
