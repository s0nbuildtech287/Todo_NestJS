import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const url = req.originalUrl;

    if (url.includes('/user')) {
      console.log('[USER] Logging:', req.method, url);
      console.log('Xuan Son - User');
    } else if (url.includes('/todo')) {
      console.log('[TODO] Logging:', req.method, url);
      console.log('Xuan Son is working on TODO');
    } else {
      console.log('[GENERAL] Logging:', req.method, url);
    }
    next();
  }
}
