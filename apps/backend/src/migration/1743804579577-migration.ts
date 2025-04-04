import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1743804579577 implements MigrationInterface {
    name = 'Migration1743804579577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "discordId" character varying NOT NULL, "accessToken" character varying NOT NULL, "accessTokenExpiresAt" TIMESTAMP NOT NULL, "refreshToken" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "form_submission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "data" jsonb NOT NULL, "sourceHash" character varying NOT NULL, "formId" uuid, CONSTRAINT "UQ_DUPLICATE_SUBMISSION" UNIQUE ("sourceHash", "formId"), CONSTRAINT "PK_afdf6f86e3747141dd75876e027" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "form" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "startsAt" TIMESTAMP WITH TIME ZONE, "submitLimit" smallint NOT NULL, "templateId" uuid, "nameEn_gb" character varying DEFAULT '', "nameEt_ee" character varying DEFAULT '', "nameRu_ru" character varying DEFAULT '', "locationEn_gb" character varying DEFAULT '', "locationEt_ee" character varying DEFAULT '', "locationRu_ru" character varying DEFAULT '', CONSTRAINT "PK_8f72b95aa2f8ba82cf95dc7579e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "template" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "fields" integer array NOT NULL, "bannerOffset" smallint DEFAULT '0', "defaultSubmitLimit" smallint DEFAULT '25', "nameEn_gb" character varying DEFAULT '', "nameEt_ee" character varying DEFAULT '', "nameRu_ru" character varying DEFAULT '', "descriptionEn_gb" jsonb, "descriptionEt_ee" jsonb, "descriptionRu_ru" jsonb, CONSTRAINT "PK_fbae2ac36bd9b5e1e793b957b7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "announcer_options_discord" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "guildId" character varying NOT NULL, "channelId" character varying NOT NULL, CONSTRAINT "PK_532ecf5cf298dda069ed30c7597" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "announcer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL DEFAULT '', "type" integer DEFAULT '0', "optionsDiscordid" uuid, CONSTRAINT "REL_393c9754851bb15231518b05c9" UNIQUE ("optionsDiscordid"), CONSTRAINT "PK_a21a86cea05f0f4235a03a0f9dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "form_submission" ADD CONSTRAINT "FK_0c044839ddb8d7bef1c8762a3ce" FOREIGN KEY ("formId") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_6734a75d0085a9aaf1377d2db70" FOREIGN KEY ("templateId") REFERENCES "template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "announcer" ADD CONSTRAINT "FK_393c9754851bb15231518b05c9d" FOREIGN KEY ("optionsDiscordid") REFERENCES "announcer_options_discord"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcer" DROP CONSTRAINT "FK_393c9754851bb15231518b05c9d"`);
        await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_6734a75d0085a9aaf1377d2db70"`);
        await queryRunner.query(`ALTER TABLE "form_submission" DROP CONSTRAINT "FK_0c044839ddb8d7bef1c8762a3ce"`);
        await queryRunner.query(`DROP TABLE "announcer"`);
        await queryRunner.query(`DROP TABLE "announcer_options_discord"`);
        await queryRunner.query(`DROP TABLE "template"`);
        await queryRunner.query(`DROP TABLE "form"`);
        await queryRunner.query(`DROP TABLE "form_submission"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
