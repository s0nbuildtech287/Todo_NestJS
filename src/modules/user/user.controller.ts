import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { LoggingMiddleware } from 'src/middleware/logging/logging.middleware';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('user')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class UserController {
  constructor(private readonly userService: UserService) {}
  //Gọi tới các phương thức trong service qua api

  //Lấy tất cả người dùng
  @Get()
  async getAll() {
    return this.userService.findAll();
  }
  //Lấy người dùng theo id
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  //Thêm người dùngg
  @Post()
  create(@Body(new ValidationPipe()) user: CreateUserDto) {
    return this.userService.create(user);
  }
  //Cập nhật thông tin người dùng
  @UseGuards(JwtAuthGuard)
  @Post('/:id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) user: UpdateUserDto,
  ) {
    return this.userService.update(id, user);
  }
  //Xóa người dùng
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
