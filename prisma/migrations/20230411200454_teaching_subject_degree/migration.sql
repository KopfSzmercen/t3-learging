/*
  Warnings:

  - Added the required column `degree` to the `TeachingSubject` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DEGREE" AS ENUM ('BACHELOR', 'ENGINEER', 'DOCTOR', 'PROFESSOR');

-- AlterTable
ALTER TABLE "TeachingSubject" ADD COLUMN     "degree" "DEGREE" NOT NULL;
