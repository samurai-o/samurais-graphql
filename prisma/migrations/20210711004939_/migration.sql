/*
  Warnings:

  - You are about to drop the column `accountID` on the `user` table. All the data in the column will be lost.
  - Added the required column `userId` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_accountID_fkey";

-- DropIndex
DROP INDEX "user.accountID_id_index";

-- AlterTable
ALTER TABLE "account" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "accountID",
ALTER COLUMN "info" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "user.id_index" ON "user"("id");

-- AddForeignKey
ALTER TABLE "account" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
