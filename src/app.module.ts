import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TodoModule } from './modules/todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { Todo } from './entities/todo.entity';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Đọc file .env và dùng toàn app
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT') ?? '3306', 10),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Todo],
        synchronize: true,
        logging: true,
      }),
    }),
    UserModule,
    TodoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // Logging middleware cho tất cả route /user
      .apply(LoggingMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.ALL });

    consumer
      // Middleware khác nếu bạn muốn cho /todo
      .apply(LoggingMiddleware)
      .forRoutes({ path: 'todo', method: RequestMethod.ALL });
  }
}
