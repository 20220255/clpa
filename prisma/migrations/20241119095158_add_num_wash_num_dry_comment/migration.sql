/*
  Warnings:

  - Added the required column `comment` to the `Point` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numDry` to the `Point` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numWash` to the `Point` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Point" ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "numDry" INTEGER NOT NULL,
ADD COLUMN     "numWash" INTEGER NOT NULL;
