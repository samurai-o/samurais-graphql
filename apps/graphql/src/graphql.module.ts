import { ConfigurationModule } from '@app/configuration';
import { PrismastoreModule, PrismastoreService } from '@app/prismastore';
import { GraphQLModule } from '@nestjs/graphql';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthorizationModule } from '@app/authorization';
import { createOrganazitionLoader } from './loaders';
import { OrganizationResolver } from './organization/organization.resolver';
import { SessionMiddleware } from '@app/middlewares';
import { LoggerMiddleware } from '@app/middlewares/logger.middleware';
import { AccountResolver } from './account/account.resolver';

@Module({
  imports: [
    ConfigurationModule,
    PrismastoreModule,
    AuthorizationModule,
    GraphQLModule.forRootAsync({
      inject: [PrismastoreService],
      useFactory: (prisma: PrismastoreService) => {
        return {
          tracing: true,
          introspection: true,
          playground: true,
          cacheControl: true,
          debug: true,
          transformAutoSchemaFile: true,
          context: ({ req, res }) => {
            return {
              req,
              res,
              prisma,
              loaders: {
                organazition: createOrganazitionLoader(prisma),
              },
            };
          },
          autoSchemaFile: 'graphql/schema.graphql',
        };
      },
    }),
  ],
  providers: [OrganizationResolver, AccountResolver],
})
export class GraphqlModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
