/*
  Warnings:

  - Added the required column `claimedDate` to the `Reference` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reference" ADD COLUMN     "claimedDate" TIMESTAMP(3) NOT NULL;
