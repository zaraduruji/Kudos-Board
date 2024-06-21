-- CreateTable
CREATE TABLE "KudoBoard" (
    "id" SERIAL NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "KudoBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KudoCard" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "boardId" INTEGER NOT NULL,

    CONSTRAINT "KudoCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KudoCard" ADD CONSTRAINT "KudoCard_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "KudoBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
