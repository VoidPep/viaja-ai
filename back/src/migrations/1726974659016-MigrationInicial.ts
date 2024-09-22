import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationInicial1726974659016 implements MigrationInterface {
    name = 'MigrationInicial1726974659016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`senha\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`cpf\` varchar(255) NOT NULL, \`administrador\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pergunta\` (\`id\` int NOT NULL AUTO_INCREMENT, \`texto\` varchar(255) NOT NULL, \`tipo\` enum ('range', 'text_input', 'radio', 'checkbox') NOT NULL DEFAULT 'text_input', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`resposta\` (\`id\` int NOT NULL AUTO_INCREMENT, \`resposta\` varchar(255) NOT NULL, \`perguntaId\` int NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`resposta\` ADD CONSTRAINT \`FK_1916aa8ce233b4fc719f858227f\` FOREIGN KEY (\`perguntaId\`) REFERENCES \`pergunta\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`resposta\` ADD CONSTRAINT \`FK_0fd3f69d4557b93074964d8ec23\` FOREIGN KEY (\`userId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`resposta\` DROP FOREIGN KEY \`FK_0fd3f69d4557b93074964d8ec23\``);
        await queryRunner.query(`ALTER TABLE \`resposta\` DROP FOREIGN KEY \`FK_1916aa8ce233b4fc719f858227f\``);
        await queryRunner.query(`DROP TABLE \`resposta\``);
        await queryRunner.query(`DROP TABLE \`pergunta\``);
        await queryRunner.query(`DROP TABLE \`usuario\``);
    }

}
