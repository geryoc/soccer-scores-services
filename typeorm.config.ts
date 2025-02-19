import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'SoccerScoresLocal',
  synchronize: false,
  migrationsRun: true,
  migrations: [__dirname + '/src/migrations/*.ts'],
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
});

export default dataSource;
