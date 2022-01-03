/*
  Warnings:

  - You are about to drop the column `domainId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Domain` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_domainId_fkey`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `domainId`;

-- DropTable
DROP TABLE `Domain`;
