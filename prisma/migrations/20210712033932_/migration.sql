/*
  Warnings:

  - You are about to drop the column `accountId` on the `personnel` table. All the data in the column will be lost.
  - You are about to drop the `pkg` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `personnel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pkg" DROP CONSTRAINT "pkg_organazitionId_fkey";

-- DropForeignKey
ALTER TABLE "developer" DROP CONSTRAINT "developer_packageId_fkey";

-- DropForeignKey
ALTER TABLE "developer" DROP CONSTRAINT "developer_userId_fkey";

-- DropForeignKey
ALTER TABLE "personnel" DROP CONSTRAINT "personnel_accountId_fkey";

-- DropIndex
DROP INDEX "developer.id_userId_index";

-- AlterTable
ALTER TABLE "personnel" DROP COLUMN "accountId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "pkg";

-- CreateTable
CREATE TABLE "packages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "describe" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organazitionId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "packages.id_name_organazitionId_index" ON "packages"("id", "name", "organazitionId");

-- CreateIndex
CREATE INDEX "developer.id_index" ON "developer"("id");

-- AddForeignKey
ALTER TABLE "packages" ADD FOREIGN KEY ("organazitionId") REFERENCES "organazition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developer" ADD FOREIGN KEY ("packageId") REFERENCES "packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personnel" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
