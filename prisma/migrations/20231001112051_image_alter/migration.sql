/*
  Warnings:

  - You are about to alter the column `reserved_date` on the `reservasi` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `image` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `articles` ADD COLUMN `image` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `reservasi` MODIFY `reserved_date` DATETIME NOT NULL;
