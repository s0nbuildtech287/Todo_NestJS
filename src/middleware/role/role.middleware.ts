import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: any, res: any, next: () => void) {
    const userId = req.params.id; // Lấy ID người dùng từ route

    if (!userId) {
      throw new HttpException('User ID not provided', HttpStatus.BAD_REQUEST);
    }

    try {
      const user = await this.userService.findOne(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      req.userRole = user.role; // Lưu vai trò vào req
      console.log('User Role:', req.userRole);
      next(); // Tiếp tục xử lý yêu cầu
    } catch (error) {
      throw new HttpException(
        'Error retrieving user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
