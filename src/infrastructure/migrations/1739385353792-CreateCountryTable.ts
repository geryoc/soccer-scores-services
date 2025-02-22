import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCountryTable1739385353792 implements MigrationInterface {
  name = 'CreateCountryTable1739385353792';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "country" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_Country" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "country"`);
  }
}
