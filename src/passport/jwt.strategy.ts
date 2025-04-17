import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: configService.get<string>('JWT_SECRET') || 'xu4ns0n',
      secretOrKey: process.env.JWT_SECRET || 'xu4ns0n',
    });
  }

  async validate(payload: any) {
    console.log('Payload:', payload);
    return { id: payload.sub, email: payload.email };
  }
}
