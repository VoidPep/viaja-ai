import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteCascade1733794894283 implements MigrationInterface {
    name = 'DeleteCascade1733794894283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`imagem_do_roteiro\` DROP FOREIGN KEY \`FK_4b2a0c1bfec1fff5bb77d1f05fd\``);
        await queryRunner.query(`ALTER TABLE \`imagem_do_roteiro\` CHANGE \`idRoteiro\` \`idRoteiro\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`roteiro\` DROP FOREIGN KEY \`FK_1fec2b995c464b3c2cf29311835\``);
        await queryRunner.query(`ALTER TABLE \`roteiro\` CHANGE \`idUsuario\` \`idUsuario\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_9512f78c31252bdfb955be1fed0\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`idPlano\` \`idPlano\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`imagem_do_roteiro\` ADD CONSTRAINT \`FK_4b2a0c1bfec1fff5bb77d1f05fd\` FOREIGN KEY (\`idRoteiro\`) REFERENCES \`roteiro\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roteiro\` ADD CONSTRAINT \`FK_1fec2b995c464b3c2cf29311835\` FOREIGN KEY (\`idUsuario\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_9512f78c31252bdfb955be1fed0\` FOREIGN KEY (\`idPlano\`) REFERENCES \`plano\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_9512f78c31252bdfb955be1fed0\``);
        await queryRunner.query(`ALTER TABLE \`roteiro\` DROP FOREIGN KEY \`FK_1fec2b995c464b3c2cf29311835\``);
        await queryRunner.query(`ALTER TABLE \`imagem_do_roteiro\` DROP FOREIGN KEY \`FK_4b2a0c1bfec1fff5bb77d1f05fd\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`idPlano\` \`idPlano\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_9512f78c31252bdfb955be1fed0\` FOREIGN KEY (\`idPlano\`) REFERENCES \`plano\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roteiro\` CHANGE \`idUsuario\` \`idUsuario\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`roteiro\` ADD CONSTRAINT \`FK_1fec2b995c464b3c2cf29311835\` FOREIGN KEY (\`idUsuario\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`imagem_do_roteiro\` CHANGE \`idRoteiro\` \`idRoteiro\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`imagem_do_roteiro\` ADD CONSTRAINT \`FK_4b2a0c1bfec1fff5bb77d1f05fd\` FOREIGN KEY (\`idRoteiro\`) REFERENCES \`roteiro\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
