import { Configuration } from 'log4js';
import { resolve } from 'path';

const basepath = resolve(__dirname, '../../../../logs');

export const loggerConfig: Configuration = {
  appenders: {
    access: {
      type: 'dateFile',
      filename: `${basepath}/access/access.log`,
      alwaysIncludePattern: true,
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      keepFileExt: true,
    },
    app: {
      type: 'dateFile',
      filename: `${basepath}/app/app.log`,
      alwaysIncludePattern: true,
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      keepFileExt: true,
    },
    errorFile: {
      type: 'dateFile',
      filename: `${basepath}/error/error.log`,
      alwaysIncludePattern: true,
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      keepFileExt: true,
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
    console: {
      type: 'console',
    },
  },
  categories: {
    default: { appenders: ['console', 'app', 'errors'], level: 'DEBUG' },
    info: { appenders: ['console', 'app', 'errors'], level: 'info' },
    access: { appenders: ['console', 'app', 'errors'], level: 'info' },
    http: { appenders: ['access'], level: 'debug' },
  },
  pm2: true,
  pm2InstanceVar: 'INSTANCE_ID',
};
