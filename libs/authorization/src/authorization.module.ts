import { ConfigurationModule, JWT_SECRETORKEY } from '@app/configuration';
import { PrismastoreModule } from '@app/prismastore';
import { TaskModule } from '@app/task';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthorizationService } from './authorization.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Global()
@Module({
  imports: [
    ConfigurationModule,
    PrismastoreModule,
    TaskModule,
    JwtModule.register({ secret: JWT_SECRETORKEY }),
  ],
  providers: [JwtStrategy, AuthorizationService],
  exports: [JwtStrategy, AuthorizationService],
})
export class AuthorizationModule {}
