import {MigrationInterface, QueryRunner} from "typeorm";

export class createRole1584091080230 implements MigrationInterface {
    name = 'createRole1584091080230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `roles` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD `roleId` int UNSIGNED NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD UNIQUE INDEX `IDX_368e146b785b574f42ae9e53d5` (`roleId`)", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `REL_368e146b785b574f42ae9e53d5` ON `users` (`roleId`)", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_368e146b785b574f42ae9e53d5e` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_368e146b785b574f42ae9e53d5e`", undefined);
        await queryRunner.query("DROP INDEX `REL_368e146b785b574f42ae9e53d5` ON `users`", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP INDEX `IDX_368e146b785b574f42ae9e53d5`", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `roleId`", undefined);
        await queryRunner.query("DROP TABLE `roles`", undefined);
    }

}
