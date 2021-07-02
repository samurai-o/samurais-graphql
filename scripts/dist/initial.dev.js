"use strict";

/* eslint-disable @typescript-eslint/no-var-requires */

/** 项目环境初始化 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
var Ftp = require('ssh2-sftp-client');

var _require = require('path'),
    join = _require.join;

var _require2 = require('fs'),
    existsSync = _require2.existsSync,
    readFileSync = _require2.readFileSync;

var client = new Ftp();
var INITIAL_CONFIG = '.initial.json'; //初始化环境配置文件

function checkLocalConfig() {
  if (!existsSync(join(process.cwd(), INITIAL_CONFIG))) throw new Error("\u7F3A\u5C11".concat(INITIAL_CONFIG, "\u914D\u7F6E\u6587\u4EF6"));
  var json = readFileSync(join(process.cwd(), INITIAL_CONFIG));
  if (!json) throw new Error('配置参数为空');
  return JSON.parse(json);
}

function bootstrap() {
  var _checkLocalConfig, host, username, password, list;

  return regeneratorRuntime.async(function bootstrap$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _checkLocalConfig = checkLocalConfig(), host = _checkLocalConfig.host, username = _checkLocalConfig.username, password = _checkLocalConfig.password;
          _context.next = 4;
          return regeneratorRuntime.awrap(client.connect({
            host: host,
            username: username,
            password: password
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(client.list('/home/graphql')["catch"](function () {
            return [];
          }));

        case 6:
          list = _context.sent;

          if (list.length) {
            _context.next = 14;
            break;
          }

          _context.next = 10;
          return regeneratorRuntime.awrap(client.mkdir('/home/graphql/prisma'));

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(client.mkdir('/home/graphql/env'));

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(client.mkdir('/home/graphql/logs'));

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(client.uploadDir(join(process.cwd(), 'prisma'), '/home/graphql/prisma'));

        case 16:
          _context.next = 18;
          return regeneratorRuntime.awrap(client.uploadDir(join(process.cwd(), 'env'), '/home/graphql/env'));

        case 18:
          // await client.put(join(process.cwd(), '.env'), '/home/graphql/.env');
          process.exit(0);
          _context.next = 25;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          process.exit(0);

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 21]]);
}

bootstrap();