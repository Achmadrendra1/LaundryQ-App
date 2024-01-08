/*
  Warnings:

  - Made the column `gender` on table `userProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "userProfile" ALTER COLUMN "gender" SET NOT NULL;
