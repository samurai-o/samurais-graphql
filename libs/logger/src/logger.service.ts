import { Injectable, Logger } from '@nestjs/common';
import { basename } from 'path';
import { logger } from './core';
import log4 from './core/utils';
import * as StackTrace from 'stacktrace-js';

@Injectable()
export class LoggerService extends Logger {
  constructor() {
    super('[LOGGER]', true);
  }
  static getStackTrace(deep = 2): string {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
    const stackInfo: StackTrace.StackFrame = stackList[deep];
    const lineNumber: number = stackInfo.lineNumber;
    const columneNumber: number = stackInfo.columnNumber;
    const filename: string = stackInfo.fileName;
    const baseName: string = basename(filename);
    return `${baseName}(line: ${lineNumber}, column: ${columneNumber}): \n`;
  }

  static trace(...args: any) {
    logger.trace(LoggerService.getStackTrace(), ...args);
  }

  static debug(...args: any) {
    logger.debug(LoggerService.getStackTrace(), ...args);
  }

  static log(...args: any) {
    logger.info(LoggerService.getStackTrace(), ...args);
  }

  static info(...args: any) {
    logger.info(LoggerService.getStackTrace(), ...args);
  }

  static warn(...args: any) {
    logger.warn(LoggerService.getStackTrace(), ...args);
  }

  static warning(...args: any) {
    logger.warn(LoggerService.getStackTrace(), ...args);
  }

  static error(...args: any) {
    logger.error(LoggerService.getStackTrace(), ...args);
  }

  static fatal(...args: any) {
    logger.fatal(LoggerService.getStackTrace(), ...args);
  }

  static access(...args: any) {
    const httplog = log4.getLogger('http');
    httplog.info(LoggerService.getStackTrace(), ...args);
  }

  trace(...args: any) {
    logger.trace(LoggerService.getStackTrace(), ...args);
  }

  debug(...args: any) {
    logger.debug(LoggerService.getStackTrace(), ...args);
  }

  log(...args: any) {
    logger.info(LoggerService.getStackTrace(), ...args);
  }

  info(...args: any) {
    logger.info(LoggerService.getStackTrace(), ...args);
  }

  warn(...args: any) {
    logger.warn(LoggerService.getStackTrace(), ...args);
  }

  warning(...args: any) {
    logger.warn(LoggerService.getStackTrace(), ...args);
  }

  error(...args: any) {
    logger.error(LoggerService.getStackTrace(), ...args);
  }

  fatal(...args: any) {
    logger.fatal(LoggerService.getStackTrace(), ...args);
  }

  access(...args: any) {
    const httplog = log4.getLogger('http');
    httplog.info(LoggerService.getStackTrace(), ...args);
  }
}
