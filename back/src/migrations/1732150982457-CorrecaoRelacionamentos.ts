import { MigrationInterface, QueryRunner } from "typeorm";

export class CorrecaoRelacionamentos1732150982457 implements MigrationInterface {
    name = 'CorrecaoRelacionamentos1732150982457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roteiro" DROP CONSTRAINT "FK_8cc1c1862cd8d91dd80d48e563d"`);
        await queryRunner.query(`ALTER TABLE "roteiro" DROP COLUMN "DataInicio"`);
        await queryRunner.query(`ALTER TABLE "roteiro" DROP COLUMN "DataFim"`);
        await queryRunner.query(`ALTER TABLE "roteiro" DROP COLUMN "usuarioId"`);
        await queryRunner.query(`ALTER TABLE "roteiro" ADD "dataInicio" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roteiro" ADD "dataFim" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roteiro" ADD "custo_total_estimado" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roteiro" ADD "json" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roteiro" ADD "idUsuario" integer`);
        await queryRunner.query(`ALTER TYPE "public"."pergunta_tipo_enum" RENAME TO "pergunta_tipo_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."pergunta_tipo_enum" AS ENUM('range', 'text_input', 'radio', 'checkbox', 'date')`);
        await queryRunner.query(`ALTER TABLE "pergunta" ALTER COLUMN "tipo" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pergunta" ALTER COLUMN "tipo" TYPE "public"."pergunta_tipo_enum" USING "tipo"::"text"::"public"."pergunta_tipo_enum"`);
        await queryRunner.query(`ALTER TABLE "pergunta" ALTER COLUMN "tipo" SET DEFAULT 'text_input'`);
        await queryRunner.query(`DROP TYPE "public"."pergunta_tipo_enum_old"`);
        await queryRunner.query(`ALTER TABLE "roteiro" ADD CONSTRAINT "FK_1fec2b995c464b3c2cf29311835" FOREIGN KEY ("idUsuario") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roteiro" DROP CONSTRAINT "FK_1fec2b995c464b3c2cf29311835"`);
        await queryRunner.query(`CREATE TYPE "public"."pergunta_tipo_enum_old" AS ENUM('range', 'text_input', 'radio', 'checkbox')`);
        await queryRunner.query(`ALTER TABLE "pergunta" ALTER COLUMN "tipo" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pergunta" ALTER COLUMN "tipo" TYPE "public"."pergunta_tipo_enum_old" USING "tipo"::"text"::"public"."pergunta_tipo_enum_old"`);
        await queryRunner.query(`ALTER TABLE "pergunta" ALTER COLUMN "tipo" SET DEFAULT 'text_input'`);
        await queryRunner.query(`DROP TYPE "public"."pergunta_tipo_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."pergunta_tipo_enum_old" RENAME TO "pergunta_tipo_enum"`);
        await queryRunner.query(`ALTER TABLE "roteiro" DROP COLUMN "idUsuario"`);
        await queryRunner.query(`ALTER TABLE "roteiro" DROP COLUMN "json"`);
        await queryRunner.query(`ALTER TABLE "roteiro" DROP COLUMN "custo_total_estimado"`);
        await queryRunner.query(`ALTER TABLE "roteiro" DROP COLUMN "dataFim"`);
        await queryRunner.query(`ALTER TABLE "roteiro" DROP COLUMN "dataInicio"`);
        await queryRunner.query(`ALTER TABLE "roteiro" ADD "usuarioId" integer`);
        await queryRunner.query(`ALTER TABLE "roteiro" ADD "DataFim" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roteiro" ADD "DataInicio" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roteiro" ADD CONSTRAINT "FK_8cc1c1862cd8d91dd80d48e563d" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
