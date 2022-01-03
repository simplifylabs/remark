/*
  Warnings:

  - A unique constraint covering the columns `[domain]` on the table `Domain` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[filtered]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Domain_domain_key` ON `Domain`(`domain`);

-- CreateIndex
CREATE UNIQUE INDEX `Url_filtered_key` ON `Url`(`filtered`);
