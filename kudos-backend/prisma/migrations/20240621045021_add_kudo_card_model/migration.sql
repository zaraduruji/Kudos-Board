/*
  Warnings:

  - You are about to drop the column `message` on the `KudoCard` table. All the data in the column will be lost.
  - Added the required column `description` to the `KudoCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `KudoCard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "KudoCard" DROP CONSTRAINT "KudoCard_boardId_fkey";

-- AlterTable
ALTER TABLE "KudoCard" DROP COLUMN "message",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "upvote" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "KudoCard" ADD CONSTRAINT "KudoCard_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "KudoBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
