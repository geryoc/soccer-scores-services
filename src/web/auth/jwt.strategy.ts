import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import * as jwksRsa from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksUri: `${configService.get<string>('AUTH0_ISSUER_URL')}/.well-known/jwks.json`,
      }),
      audience: configService.get<string>('AUTH0_AUDIENCE'),
      issuer: `${configService.get<string>('AUTH0_ISSUER_URL')}/`,
      algorithms: ['RS256'],
    });
  }

  validate(payload: unknown) {
    return payload;
  }
}
