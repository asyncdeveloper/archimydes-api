import {MigrationInterface, QueryRunner} from "typeorm";

export class createStory1584101775582 implements MigrationInterface {
    name = 'createStory1584101775582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `stories` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `summary` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `types` enum ('ENHANCEMENT', 'BUGFIX', 'DEVELOPMENT') NOT NULL DEFAULT 'BUGFIX', `complexity` varchar(255) NOT NULL, `estimated_time` time NOT NULL, `cost` int NOT NULL, `state` enum ('REJECTED', 'APPROVED', 'WAITING_AUTHORIZATION') NOT NULL DEFAULT 'WAITING_AUTHORIZATION', `is_active` tinyint NOT NULL DEFAULT 0, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `ownerId` int UNSIGNED NULL, `reviewerId` int UNSIGNED NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_368e146b785b574f42ae9e53d5e`", undefined);
        await queryRunner.query("ALTER TABLE `roles` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `roleId` `roleId` int UNSIGNED NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_368e146b785b574f42ae9e53d5e` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `stories` ADD CONSTRAINT `FK_cbfc4ddb78b5aa830b3d5c1c599` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `stories` ADD CONSTRAINT `FK_942895919bbcf4d903d9a61ed21` FOREIGN KEY (`reviewerId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `stories` DROP FOREIGN KEY `FK_942895919bbcf4d903d9a61ed21`", undefined);
        await queryRunner.query("ALTER TABLE `stories` DROP FOREIGN KEY `FK_cbfc4ddb78b5aa830b3d5c1c599`", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_368e146b785b574f42ae9e53d5e`", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `roleId` `roleId` int(10) UNSIGNED NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `roles` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_368e146b785b574f42ae9e53d5e` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("DROP TABLE `stories`", undefined);
    }

}
