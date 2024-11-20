import { MigrationInterface, QueryRunner } from "typeorm";

export class CorrecaoForeignKeyUsuarioRoteiro1732144323917 implements MigrationInterface {
    name = 'CorrecaoForeignKeyUsuarioRoteiro1732144323917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roteiro\` DROP FOREIGN KEY \`FK_1fec2b995c464b3c2cf29311835\``);
        await queryRunner.query(`ALTER TABLE \`roteiro\` CHANGE \`idUsuario\` \`idUsuario\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_9512f78c31252bdfb955be1fed0\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`idPlano\` \`idPlano\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`roteiro\` ADD CONSTRAINT \`FK_1fec2b995c464b3c2cf29311835\` FOREIGN KEY (\`idUsuario\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_9512f78c31252bdfb955be1fed0\` FOREIGN KEY (\`idPlano\`) REFERENCES \`plano\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_9512f78c31252bdfb955be1fed0\``);
        await queryRunner.query(`ALTER TABLE \`roteiro\` DROP FOREIGN KEY \`FK_1fec2b995c464b3c2cf29311835\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`idPlano\` \`idPlano\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_9512f78c31252bdfb955be1fed0\` FOREIGN KEY (\`idPlano\`) REFERENCES \`plano\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roteiro\` CHANGE \`idUsuario\` \`idUsuario\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`roteiro\` ADD CONSTRAINT \`FK_1fec2b995c464b3c2cf29311835\` FOREIGN KEY (\`idUsuario\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
