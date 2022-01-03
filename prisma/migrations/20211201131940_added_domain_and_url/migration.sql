/*
  Warnings:

  - Added the required column `domainId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalURL` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `domainId` VARCHAR(191) NOT NULL,
    ADD COLUMN `originalURL` VARCHAR(191) NOT NULL,
    ADD COLUMN `urlId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Domain` (
    `id` VARCHAR(191) NOT NULL,
    `domain` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `URL` (
    `id` VARCHAR(191) NOT NULL,
    `filtered` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_domainId_fkey` FOREIGN KEY (`domainId`) REFERENCES `Domain`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_urlId_fkey` FOREIGN KEY (`urlId`) REFERENCES `URL`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
