import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { controllers } from './web/controllers/controllers';
import { services } from './application/_shared/services';
import { databaseConfig } from './infrastructure/config/database.config';
import { repositoryProviders } from './infrastructure/repository/repository.providers';
import { CqrsModule } from '@nestjs/cqrs';
import { handlers } from './application/_shared/handlers';
import { gateways } from './web/gateways/gateways';

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
  providers: [...handlers, ...repositoryProviders, ...services, ...gateways],
})
export class AppModule {}
