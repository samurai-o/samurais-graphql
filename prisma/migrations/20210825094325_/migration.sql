/*
  Warnings:

  - Added the required column `verification` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account" ADD COLUMN     "verification" BOOLEAN NOT NULL;
