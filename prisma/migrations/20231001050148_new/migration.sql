/*
  Warnings:

  - You are about to alter the column `reserved_date` on the `reservasi` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `description` on the `services` table. All the data in the column will be lost.
  - Added the required column `klinik_close` to the `kliniks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `klinik_open` to the `kliniks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `kliniks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kliniks` ADD COLUMN `klinik_close` TIME NOT NULL,
    ADD COLUMN `klinik_open` TIME NOT NULL,
    ADD COLUMN `password` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `reservasi` MODIFY `reserved_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `services` DROP COLUMN `description`;
