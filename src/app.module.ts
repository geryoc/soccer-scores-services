import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { controllers } from './web/controllers/controllers';
import { applicationServices } from './application/_shared/services';
import { databaseConfig } from './infrastructure/config/database.config';
import { repositoryProviders } from './infrastructure/repository/repository.providers';
import { CqrsModule } from '@nestjs/cqrs';
import { applicationRequestHandlers } from './application/_shared/handlers';
import { gateways } from './web/gateways/gateways';
import { JwtStrategy } from './web/auth/jwt.strategy';

@Module({
  imports: [
    CqrsModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: databaseConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [...controllers],
  providers: [
    JwtStrategy,
    ...repositoryProviders,
    ...applicationRequestHandlers,
    ...applicationServices,
    ...gateways,
  ],
})
export class AppModule {}
