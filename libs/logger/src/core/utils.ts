import * as log4 from 'log4js';
import moment from 'moment';
import chalk from 'chalk';
import { StackFrame, getSync } from 'stacktrace-js';
import { loggerConfig } from './config';

log4.addLayout('Awesome-nest', () => {
  return (event: log4.LoggingEvent) => {
    console.log('event', event);
    // 日志输入的位置
    const stackframes: StackFrame[] = getSync();
    const codemessage = stackframes[stackframes.length - 1];
    const time = moment().format('YYYY-MM-DD HH:mm:ss');
    return `[${time}] ${chalk.green(`[${codemessage.fileName}]`)}${chalk.grey(
      `(line: ${codemessage.lineNumber}, col: ${codemessage.columnNumber})`,
    )}`;
  };
});
log4.configure(loggerConfig);
export const logger = log4.getLogger();
export const httplog = log4.connectLogger(log4.getLogger('http'), {
  level: 'info',
});
export default log4;
