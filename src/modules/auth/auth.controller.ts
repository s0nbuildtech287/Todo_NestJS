import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  //Đăng ký
  @Post('register')
  register(@Body() userData: any) {
    return this.userService.create(userData);
  }
  //Đăng nhập
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request: any) {
    return this.authService.loginjwt(request.user);
  }
  //giải mã jwt
}
