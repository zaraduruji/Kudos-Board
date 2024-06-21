/*
  Warnings:

  - Added the required column `category` to the `KudoBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KudoBoard" ADD COLUMN     "category" TEXT NOT NULL;
