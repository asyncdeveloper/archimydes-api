import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUser1584091818612 implements MigrationInterface {
    name = 'updateUser1584091818612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_368e146b785b574f42ae9e53d5` ON `users`", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_368e146b785b574f42ae9e53d5e`", undefined);
        await queryRunner.query("ALTER TABLE `roles` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `id` `id` int UNSIGNED NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `roleId` `roleId` int UNSIGNED NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_368e146b785b574f42ae9e53d5e` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_368e146b785b574f42ae9e53d5e`", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `roleId` `roleId` int(10) UNSIGNED NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `roles` CHANGE `id` `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_368e146b785b574f42ae9e53d5e` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_368e146b785b574f42ae9e53d5` ON `users` (`roleId`)", undefined);
    }

}
