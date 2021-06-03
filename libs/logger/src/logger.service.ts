import { Injectable } from '@nestjs/common';
import { httplog, logger } from './core';

@Injectable()
export class LoggerService {
  trace(...args: any) {
    logger.trace(args);
  }

  log(...args: any) {
    logger.log(args);
  }

  info(...args: any) {
    logger.info(args);
  }

  debug(...args: any) {
    logger.debug(args);
  }

  warn(...args: any) {
    logger.warn(args);
  }

  error(...args: any) {
    logger.error(args);
  }
}
