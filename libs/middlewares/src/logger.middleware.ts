import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from '@app/logger';
import { Request, Response } from 'express';

function httpformmat(req: Request, res: Response) {
  // 组装日志信息
  return ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      Request original url: ${req.originalUrl}
      Method: ${req.method}
      IP: ${req.ip}
      Status code: ${res.statusCode}
      Parmas: ${JSON.stringify(req.params)}
      Query: ${JSON.stringify(req.query)}
      Body: ${JSON.stringify(
        req.body,
      )} \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    `;
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    next();
    LoggerService.access(httpformmat(req, res));
  }
}
