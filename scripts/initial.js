/* eslint-disable @typescript-eslint/no-var-requires */
/** 项目环境初始化 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Ftp = require('ssh2-sftp-client');
const { join } = require('path');
const { existsSync, readFileSync } = require('fs');

const client = new Ftp();
const INITIAL_CONFIG = '.initial.json'; //初始化环境配置文件

function checkLocalConfig() {
  if (!existsSync(join(process.cwd(), INITIAL_CONFIG)))
    throw new Error(`缺少${INITIAL_CONFIG}配置文件`);
  const json = readFileSync(join(process.cwd(), INITIAL_CONFIG));
  if (!json) throw new Error('配置参数为空');
  return JSON.parse(json);
}

async function bootstrap() {
  try {
    const { host, username, password } = checkLocalConfig();
    await client.connect({
      host,
      username,
      password,
    });
    const list = await client.list('/home/node/source').catch(() => []);
    if (!list.length) {
      await client.mkdir('/home/node/source/prisma');
      await client.mkdir('/home/node/source/env');
      await client.mkdir('/home/node/source/logs');
    }
    await client.uploadDir(
      join(process.cwd(), 'prisma'),
      '/home/node/source/prisma',
    );
    await client.uploadDir(join(process.cwd(), 'env'), '/home/node/source/env');
    // await client.put(join(process.cwd(), '.env'), '/home/graphql/.env');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
}

bootstrap();
