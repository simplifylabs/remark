/*
  Warnings:

  - You are about to drop the column `remark` on the `Post` table. All the data in the column will be lost.
  - Added the required column `comment` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `remark`,
    ADD COLUMN `comment` VARCHAR(191) NOT NULL;
