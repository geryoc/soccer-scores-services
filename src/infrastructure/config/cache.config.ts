import { createKeyv } from '@keyv/redis';
import { ConfigService } from '@nestjs/config';

export const cacheConfig = (configService: ConfigService) => ({
  isGlobal: true,
  stores: [createKeyv(configService.get<string>('REDIS_URL'))],
});
