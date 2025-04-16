import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //middleware global
  // app.use(new LoggingMiddleware().use);
  //cấu hình swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // đường dẫn api ra giao diện swagger test api
  SwaggerModule.setup('api', app, document);

  //chạy server
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
