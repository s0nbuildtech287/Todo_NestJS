import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { LocalStrategy } from 'src/passport/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalAuthGuard, LocalStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
