import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMatchTable1740145592882 implements MigrationInterface {
  name = 'CreateMatchTable1740145592882';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "competition_team" DROP CONSTRAINT "FK_competition_team_competition"`,
    );
    await queryRunner.query(
      `ALTER TABLE "competition_team" DROP CONSTRAINT "FK_competition_team_team"`,
    );
    await queryRunner.query(
      `ALTER TABLE "competition" DROP CONSTRAINT "FK_competition_country"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."match_status_enum" AS ENUM('scheduled', 'ongoing', 'completed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "match" ("id" SERIAL NOT NULL, "localScore" integer NOT NULL DEFAULT '0', "awayScore" integer NOT NULL DEFAULT '0', "matchDate" TIMESTAMP WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "status" "public"."match_status_enum" NOT NULL DEFAULT 'scheduled', "localTeamId" integer NOT NULL, "awayTeamId" integer NOT NULL, "competitionId" integer NOT NULL, CONSTRAINT "PK_match" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "competition_team" ADD CONSTRAINT "FK_competition_team_competition" FOREIGN KEY ("competitionId") REFERENCES "competition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "competition_team" ADD CONSTRAINT "FK_competition_team_team" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "competition" ADD CONSTRAINT "FK_competition_country" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "FK_match_team_localTeamId" FOREIGN KEY ("localTeamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "FK_match_team_awayTeamId" FOREIGN KEY ("awayTeamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "FK_match_competition_competitionId" FOREIGN KEY ("competitionId") REFERENCES "competition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "match" DROP CONSTRAINT "FK_fdfc948b0661b66a83772e3d1fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" DROP CONSTRAINT "FK_07f5b02809e195be415834ed78a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" DROP CONSTRAINT "FK_f3367dc7a2b173d2d2a4b1c22d9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "competition" DROP CONSTRAINT "FK_ac9b809aee64f08611a55f7bb9a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "competition_team" DROP CONSTRAINT "FK_fc2f97f353b5ead3315ee110954"`,
    );
    await queryRunner.query(
      `ALTER TABLE "competition_team" DROP CONSTRAINT "FK_01993729d1c8a686bf5dee2e52f"`,
    );
    await queryRunner.query(`DROP TABLE "match"`);
    await queryRunner.query(`DROP TYPE "public"."match_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "competition" ADD CONSTRAINT "FK_competition_country" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "competition_team" ADD CONSTRAINT "FK_competition_team_team" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "competition_team" ADD CONSTRAINT "FK_competition_team_competition" FOREIGN KEY ("competitionId") REFERENCES "competition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
