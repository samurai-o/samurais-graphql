/* eslint-disable @typescript-eslint/no-unused-vars */
import { isEmpty, isNum, isObject, isString } from '@frade-sam/samtools';
import Moment from 'moment';
import Chalk from 'chalk';
import * as log4 from 'log4js';
import config from './config';
import { inspect } from 'util';

// 日志级别
export enum LoggerLevel {
  ALL = 'ALL',
  MARK = 'MARK',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  OFF = 'OFF',
}

log4.addLayout('awesome-nest', (config: any) => {
  return (logevent: log4.LoggingEvent): string => {
    const messages: string = logevent.data
      .reduce((a: string[], b) => {
        if (!isObject(b) || isString(b)) return a.concat(b);
        if (!isString(b)) return a.concat(inspect(b, false, 3, true));
        return a;
      }, [])
      .join(' ');
    const [moduleName, position] = logevent.data.reduce(
      (a: string[], b) => {
        if (isObject(b) && isNum(b.lineNumber) && isNum(b.columnNumber)) {
          a[1] = ` [${b.lineNumber}, ${b.columnNumber}]`;
        }
        if (isObject(b) && isString(b.context) && !isEmpty(b.context)) {
          a[0] = b.context;
        }
        return a;
      },
      ['[LoggerService] ', ''],
    );
    const type = `[${config.type}] ${logevent.pid.toString()}   - `;
    const date = `${Moment(logevent.startTime).format('YYYY-MM-DD HH:mm:ss')}`;
    let level = `[${logevent.level}] ${messages}`;
    switch (logevent.level.toString()) {
      case LoggerLevel.DEBUG:
        level = Chalk.green(level);
        break;
      case LoggerLevel.INFO:
        level = Chalk.cyan(level);
        break;
      case LoggerLevel.WARN:
        level = Chalk.yellow(level);
        break;
      case LoggerLevel.ERROR:
        level = Chalk.red(level);
        break;
      case LoggerLevel.FATAL:
        level = Chalk.hex('#DDD4C35')(level);
        break;
      default:
        level = Chalk.grey(level);
        break;
    }
    return `${Chalk.green(type)}${date} ${Chalk.yellow(
      moduleName,
    )}${level}${position}`;
  };
});
log4.configure(config);
export const logger = log4.getLogger();
export default log4;
