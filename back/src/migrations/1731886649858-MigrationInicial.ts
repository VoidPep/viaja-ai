import { MigrationInterface, QueryRunner } from "typeorm";
export class MigrationInicial1731886649858 implements MigrationInterface {
    name = 'MigrationInicial1731886649858'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`senha\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`administrador\` tinyint NOT NULL, \`idPlano\` int NULL, \`roteirosId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`plano\` (\`id\` int NOT NULL AUTO_INCREMENT, \`descricao\` varchar(255) NOT NULL, \`valor\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roteiro\` (\`id\` int NOT NULL AUTO_INCREMENT, \`destino\` varchar(255) NOT NULL, \`DataInicio\` datetime NOT NULL, \`DataFim\` datetime NOT NULL, \`idUsuario\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pergunta\` (\`id\` int NOT NULL AUTO_INCREMENT, \`texto\` varchar(255) NOT NULL, \`tipo\` enum ('range', 'text_input', 'radio', 'checkbox') NOT NULL DEFAULT 'text_input', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`resposta\` (\`id\` int NOT NULL AUTO_INCREMENT, \`resposta\` varchar(255) NOT NULL, \`perguntaId\` int NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_9512f78c31252bdfb955be1fed0\` FOREIGN KEY (\`idPlano\`) REFERENCES \`plano\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_e8ab3e23ffee3ec1fa25d60eb82\` FOREIGN KEY (\`roteirosId\`) REFERENCES \`plano\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roteiro\` ADD CONSTRAINT \`FK_1fec2b995c464b3c2cf29311835\` FOREIGN KEY (\`idUsuario\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`resposta\` ADD CONSTRAINT \`FK_1916aa8ce233b4fc719f858227f\` FOREIGN KEY (\`perguntaId\`) REFERENCES \`pergunta\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`resposta\` ADD CONSTRAINT \`FK_0fd3f69d4557b93074964d8ec23\` FOREIGN KEY (\`userId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`resposta\` DROP FOREIGN KEY \`FK_0fd3f69d4557b93074964d8ec23\``);
        await queryRunner.query(`ALTER TABLE \`resposta\` DROP FOREIGN KEY \`FK_1916aa8ce233b4fc719f858227f\``);
        await queryRunner.query(`ALTER TABLE \`roteiro\` DROP FOREIGN KEY \`FK_1fec2b995c464b3c2cf29311835\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_e8ab3e23ffee3ec1fa25d60eb82\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_9512f78c31252bdfb955be1fed0\``);
        await queryRunner.query(`DROP TABLE \`resposta\``);
        await queryRunner.query(`DROP TABLE \`pergunta\``);
        await queryRunner.query(`DROP TABLE \`roteiro\``);
        await queryRunner.query(`DROP TABLE \`plano\``);
        await queryRunner.query(`DROP TABLE \`usuario\``);
    }
}