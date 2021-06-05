import { ApiExceptionFilter } from '@app/filters';
import { ValidationPipe } from '@app/pipes';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ApiExceptionFilter());
  await app.listen(3005);
}
bootstrap();
