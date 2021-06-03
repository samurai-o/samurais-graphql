import { ApiExceptionFilter } from '@app/filters';
import { httplog } from '@app/logger/core';
import { ValidationPipe } from '@app/pipes';
import { NestFactory } from '@nestjs/core';
import * as log4 from 'log4js';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.use(
    log4.connectLogger(log4.getLogger('access'), {
      level: log4.levels.INFO as any,
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ApiExceptionFilter());
  await app.listen(3005);
}
bootstrap();
