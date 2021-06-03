import { Injectable, NestMiddleware } from '@nestjs/common';
import { httplog, logger } from '@app/logger/core';
import { Request, Response } from 'express';

function httpformmat(path: string, status: number, params: any, body: any) {
  return `
  =============[HTTP]==============
    path: ${path}
    status: ${status}
    params: ${JSON.stringify(params)}
    body: ${JSON.stringify(body)}
  =================================
  `;
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { statusCode } = res;
    const { params, body, path } = req;
    console.log(httplog);
    // httplog(req, res, next);
    next();
    logger.log(httpformmat(path, statusCode, params, body));
  }
}
