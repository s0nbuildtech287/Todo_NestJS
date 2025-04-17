import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { LocalStrategy } from 'src/passport/local.strategy';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/passport/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalAuthGuard,
    LocalStrategy,
    JwtAuthGuard,
    JwtStrategy,
  ],
  imports: [
    UserModule,
    PassportModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'xu4sn0n',
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
