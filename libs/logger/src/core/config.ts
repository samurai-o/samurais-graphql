import { Configuration } from 'log4js';
import { resolve } from 'path';

const logdir = resolve(__dirname, '../../../logs');

const config: Configuration = {
  appenders: {
    http: {
      type: 'dateFile',
      filename: `${logdir}/http.log`,
      alwaysIncludePattern: true,
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      compress: true,
      keepFileExt: true,
    },
    app: {
      type: 'dateFile',
      filename: `${logdir}/app.log`,
      alwaysIncludePattern: true,
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      keepFileExt: true,
    },
    error: {
      type: 'dateFile',
      filename: `${logdir}/error.log`,
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
    http: { appenders: ['http'], level: 'DEBUG' },
  },
  pm2: true,
  pm2InstanceVar: 'INSTANCE_ID',
};

export default config;
