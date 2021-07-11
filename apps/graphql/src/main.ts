import { ConfigurationService } from '@app/configuration';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GraphqlModule } from './graphql.module';

async function bootstrap() {
  const app = await NestFactory.create(GraphqlModule);
  const config = app.get(ConfigurationService);
  const port = config.getEnvironment('GRPHQL_PORT') as string;
  await app.listen(port, () => {
    Logger.log('auth', '应用');
    Logger.log(port, '端口');
  });
}
bootstrap();
