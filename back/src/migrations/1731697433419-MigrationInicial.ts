import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationInicial1731697433419 implements MigrationInterface {
    name = 'MigrationInicial1731697433419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "senha" character varying NOT NULL, "email" character varying NOT NULL, "cpf" character varying NOT NULL, "administrador" boolean NOT NULL, "idPlano" integer, CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "plano" ("id" SERIAL NOT NULL, "descricao" character varying NOT NULL, "valor" integer NOT NULL, CONSTRAINT "PK_2aaa50a32a3cedbf3a12708d8cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."pergunta_tipo_enum" AS ENUM('range', 'text_input', 'radio', 'checkbox')`);
        await queryRunner.query(`CREATE TABLE "pergunta" ("id" SERIAL NOT NULL, "texto" character varying NOT NULL, "tipo" "public"."pergunta_tipo_enum" NOT NULL DEFAULT 'text_input', CONSTRAINT "PK_cd3254fbdc5b83baebe96a3c48e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resposta" ("id" SERIAL NOT NULL, "resposta" character varying NOT NULL, "perguntaId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_bf804c2c8d0434acf22e3e48f04" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roteiro" ("id" SERIAL NOT NULL, "destino" character varying NOT NULL, "DataInicio" TIMESTAMP NOT NULL, "DataFim" TIMESTAMP NOT NULL, "usuarioId" integer, CONSTRAINT "PK_1af9808f773b04a73f70db8d9fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_9512f78c31252bdfb955be1fed0" FOREIGN KEY ("idPlano") REFERENCES "plano"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resposta" ADD CONSTRAINT "FK_1916aa8ce233b4fc719f858227f" FOREIGN KEY ("perguntaId") REFERENCES "pergunta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resposta" ADD CONSTRAINT "FK_0fd3f69d4557b93074964d8ec23" FOREIGN KEY ("userId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roteiro" ADD CONSTRAINT "FK_8cc1c1862cd8d91dd80d48e563d" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roteiro" DROP CONSTRAINT "FK_8cc1c1862cd8d91dd80d48e563d"`);
        await queryRunner.query(`ALTER TABLE "resposta" DROP CONSTRAINT "FK_0fd3f69d4557b93074964d8ec23"`);
        await queryRunner.query(`ALTER TABLE "resposta" DROP CONSTRAINT "FK_1916aa8ce233b4fc719f858227f"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_9512f78c31252bdfb955be1fed0"`);
        await queryRunner.query(`DROP TABLE "roteiro"`);
        await queryRunner.query(`DROP TABLE "resposta"`);
        await queryRunner.query(`DROP TABLE "pergunta"`);
        await queryRunner.query(`DROP TYPE "public"."pergunta_tipo_enum"`);
        await queryRunner.query(`DROP TABLE "plano"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
