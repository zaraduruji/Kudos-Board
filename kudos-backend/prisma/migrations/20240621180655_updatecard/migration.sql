/*
  Warnings:

  - You are about to drop the column `image_url` on the `KudoCard` table. All the data in the column will be lost.
  - You are about to drop the column `upvote` on the `KudoCard` table. All the data in the column will be lost.
  - Added the required column `gifUrl` to the `KudoCard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "KudoCard" DROP CONSTRAINT "KudoCard_boardId_fkey";

-- AlterTable
ALTER TABLE "KudoCard" DROP COLUMN "image_url",
DROP COLUMN "upvote",
ADD COLUMN     "gifUrl" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "KudoCard" ADD CONSTRAINT "KudoCard_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "KudoBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
