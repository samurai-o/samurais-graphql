import { ConfigurationService } from '@app/configuration';
import { ApiExceptionFilter } from '@app/filters';
import { ResponseInterceptor } from '@app/interceptors';
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
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(port, () => {
    Logger.log('auth', '应用');
    Logger.log(port, '端口');
  });
}
bootstrap();
