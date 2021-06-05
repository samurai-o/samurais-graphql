/*
  Warnings:

  - Added the required column `name` to the `organazition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `describe` to the `organazition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organazition" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "describe" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "pkg" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "describe" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organazitionId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "developer" (
    "id" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "pkg.id_name_organazitionId_index" ON "pkg"("id", "name", "organazitionId");

-- CreateIndex
CREATE INDEX "developer.id_userId_index" ON "developer"("id", "userId");

-- CreateIndex
CREATE INDEX "account.email_id_index" ON "account"("email", "id");

-- CreateIndex
CREATE INDEX "organazition.id_name_index" ON "organazition"("id", "name");

-- CreateIndex
CREATE INDEX "user.accountID_id_index" ON "user"("accountID", "id");

-- AddForeignKey
ALTER TABLE "pkg" ADD FOREIGN KEY ("organazitionId") REFERENCES "organazition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer" ADD FOREIGN KEY ("packageId") REFERENCES "pkg"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer" ADD FOREIGN KEY ("userId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personnel" ADD FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personnel" ADD FOREIGN KEY ("organazitionId") REFERENCES "organazition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
