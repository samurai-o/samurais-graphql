import { ConfigurationService } from '@app/configuration';
import { ApiExceptionFilter } from '@app/filters';
import { ValidationPipe } from '@app/pipes';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const config = app.get(ConfigurationService);
  const port = config.getEnvironment('AUTH_PORT') as string;
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ApiExceptionFilter());
  Logger.log('auth', '应用');
  Logger.log(port, '端口');
  await app.listen(port);
}
bootstrap();
