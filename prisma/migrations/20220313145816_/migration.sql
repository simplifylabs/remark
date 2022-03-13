/*
  Warnings:

  - You are about to drop the column `read` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Notification` DROP COLUMN `read`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `hasUnread` BOOLEAN NOT NULL DEFAULT false;
