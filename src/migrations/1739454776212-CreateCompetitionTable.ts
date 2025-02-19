import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCompetitionTable1739454776212 implements MigrationInterface {
  name = 'CreateCompetitionTable1739454776212';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "competition" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "countryId" integer NOT NULL, CONSTRAINT "PK_competition" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "competition_team" ("id" SERIAL NOT NULL, "competitionId" integer NOT NULL, "teamId" integer NOT NULL, CONSTRAINT "PK_competition_team" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "competition" ADD CONSTRAINT "FK_competition_country" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "competition_team" ADD CONSTRAINT "FK_competition_team_competition" FOREIGN KEY ("competitionId") REFERENCES "competition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "competition_team" ADD CONSTRAINT "FK_competition_team_team" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "competition_team" DROP CONSTRAINT "FK_competition_team_team"`,
    );
    await queryRunner.query(
      `ALTER TABLE "competition_team" DROP CONSTRAINT "FK_competition_team_competition"`,
    );
    await queryRunner.query(
      `ALTER TABLE "competition" DROP CONSTRAINT "FK_competition_country"`,
    );
    await queryRunner.query(`DROP TABLE "competition_team"`);
    await queryRunner.query(`DROP TABLE "competition"`);
  }
}
