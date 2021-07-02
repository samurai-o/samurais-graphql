import { ConfigurationModule, JWT_SECRETORKEY } from '@app/configuration';
import { SessionMiddleware } from '@app/middlewares';
import { LoggerMiddleware } from '@app/middlewares/logger.middleware';
import { PrismastoreModule } from '@app/prismastore';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigurationModule,
    PrismastoreModule,
    JwtModule.register({ secret: JWT_SECRETORKEY }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
