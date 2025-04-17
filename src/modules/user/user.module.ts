import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { RoleMiddleware } from 'src/middleware/role/role.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RoleMiddleware) // Đăng ký RoleMiddleware
      .forRoutes({ path: 'user/:id', method: RequestMethod.GET });
  }
} 