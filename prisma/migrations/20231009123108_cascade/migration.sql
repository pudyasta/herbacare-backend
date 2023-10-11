-- DropForeignKey
ALTER TABLE `articles` DROP FOREIGN KEY `articles_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `reservasi` DROP FOREIGN KEY `reservasi_service_id_fkey`;

-- DropForeignKey
ALTER TABLE `reservasi` DROP FOREIGN KEY `reservasi_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `services` DROP FOREIGN KEY `services_klinik_id_fkey`;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `services` ADD CONSTRAINT `services_klinik_id_fkey` FOREIGN KEY (`klinik_id`) REFERENCES `kliniks`(`klinik_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservasi` ADD CONSTRAINT `reservasi_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services`(`service_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservasi` ADD CONSTRAINT `reservasi_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
