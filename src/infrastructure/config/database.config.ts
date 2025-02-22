import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

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
  entities: [__dirname + '/../../domain/entities/*{.ts,.js}'],
  synchronize: false,
});
