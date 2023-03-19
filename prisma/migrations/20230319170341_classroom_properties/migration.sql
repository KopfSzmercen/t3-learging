/*
  Warnings:

  - Added the required column `name` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfStudents` to the `Classroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "numberOfStudents" INTEGER NOT NULL;
