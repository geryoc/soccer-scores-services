import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertCountries1739385808562 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          INSERT INTO country (name) VALUES
          ('United States'),
          ('Canada'),
          ('Mexico'),
          ('Brazil'),
          ('Uruguay'),
          ('Argentina');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DELETE FROM country WHERE name IN ('United States', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'Uruguay');
        `);
  }
}
