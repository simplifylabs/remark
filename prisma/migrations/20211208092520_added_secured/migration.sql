/*
  Warnings:

  - Added the required column `securedURL` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `securedURL` VARCHAR(191) NOT NULL;
