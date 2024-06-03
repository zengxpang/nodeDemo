-- CreateTable
CREATE TABLE `A` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `role` ENUM('AAA', 'BBB', 'CCC') NOT NULL DEFAULT 'CCC',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
