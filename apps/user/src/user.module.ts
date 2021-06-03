import { ConfigurationModule } from '@app/configuration';
import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { UserResolver } from './user/user.resolver';
import { UserAPI } from '@app/datasource';
import { PrismastoreModule, PrismastoreService } from 'libs/prismastore/src';

@Module({
  imports: [
    ConfigurationModule,
    PrismastoreModule,
    GraphQLFederationModule.forRootAsync({
      inject: [PrismastoreService],
      useFactory: (prisma: PrismastoreService) => {
        return {
          tracing: true,
          introspection: true,
          playground: true,
          cors: {
            credentials: true,
            origin: true,
          },
          dataSources: () => ({
            userAPI: new UserAPI(prisma),
          }),
          context: ({ req, res }) => {
            return {
              req,
              res,
            };
          },
          autoSchemaFile: 'graphql/User.graphql',
        };
      },
    }),
  ],
  providers: [UserResolver],
})
export class UserModule {}
