import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CompetitionTeam } from '../entities/competition-team.entity';
import { Competition } from '../entities/competition.entity';
import { Country } from '../entities/country.entity';
import { Team } from '../entities/team.entity';

export const databaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  migrationsRun: configService.get<boolean>('DB_MIGRATIONSRUN'),
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  entities: [Team, Competition, Country, CompetitionTeam],
  synchronize: false,
});
