import { ConfigurationService } from '@app/configuration';
import { useSession } from '@app/middlewares';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const config = app.get(ConfigurationService);
  const port = config.getEnvironment('USER_PORT') as string;
  app.use(useSession);
  Logger.log('user', '[应用]');
  Logger.log(port, '[端口]');
  await app.listen(port);
}
bootstrap();
