/*
  Warnings:

  - You are about to drop the column `accountId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_accountId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "accountId";

-- AddForeignKey
ALTER TABLE "user" ADD FOREIGN KEY ("accountID") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
