/*
  Warnings:

  - Added the required column `almaMater` to the `TeachingSubject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeachingSubject" ADD COLUMN     "almaMater" TEXT NOT NULL;
