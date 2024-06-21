/*
  Warnings:

  - You are about to drop the column `author` on the `KudoCard` table. All the data in the column will be lost.
  - You are about to drop the column `imgUrl` on the `KudoCard` table. All the data in the column will be lost.
  - Added the required column `image_url` to the `KudoCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KudoCard" DROP COLUMN "author",
DROP COLUMN "imgUrl",
ADD COLUMN     "authorId" INTEGER,
ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "upVote" INTEGER NOT NULL DEFAULT 0;
