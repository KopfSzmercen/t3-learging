/*
  Warnings:

  - You are about to drop the column `numberOfStudents` on the `Classroom` table. All the data in the column will be lost.
  - Added the required column `maxNumberOfStudents` to the `Classroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classroom" DROP COLUMN "numberOfStudents",
ADD COLUMN     "maxNumberOfStudents" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "StudentProfile" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassroomToStudentProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_userId_key" ON "StudentProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassroomToStudentProfile_AB_unique" ON "_ClassroomToStudentProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassroomToStudentProfile_B_index" ON "_ClassroomToStudentProfile"("B");

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassroomToStudentProfile" ADD CONSTRAINT "_ClassroomToStudentProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassroomToStudentProfile" ADD CONSTRAINT "_ClassroomToStudentProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "StudentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
