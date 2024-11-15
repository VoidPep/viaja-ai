import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationInicial1731700801107 implements MigrationInterface {
    name = 'MigrationInicial1731700801107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "cpf"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ADD "cpf" character varying NOT NULL`);
    }

}
