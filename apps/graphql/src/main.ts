import { ConfigurationService } from '@app/configuration';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Request } from 'express';
import { GraphqlModule } from './graphql.module';

async function bootstrap() {
  const app = await NestFactory.create(GraphqlModule);
  const config = app.get(ConfigurationService);
  const port = config.getEnvironment('GRPHQL_PORT') as string;
  const allowlist = [
    'https://www.samurais.cn',
    'https://studio.apollographql.com',
  ];
  // app.enableCors((req: Request, callback) => {
  //   console.log(req.headers);
  //   const corsOptions = {};
  //   if (allowlist.indexOf(req.header('Origin')) === -1) {
  //     corsOptions['origin'] = true;
  //   } else {
  //     corsOptions['origin'] = false;
  //   }
  //   callback(null, corsOptions);
  // });
  await app.listen(port, () => {
    Logger.log('auth', '应用');
    Logger.log(port, '端口');
  });
}
bootstrap();
