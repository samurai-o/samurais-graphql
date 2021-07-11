import { ConfigurationModule } from '@app/configuration';
import { PrismastoreModule, PrismastoreService } from '@app/prismastore';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { AuthorizationModule } from '@app/authorization';
import { createOrganazitionLoader } from './loaders';
import { OrganizationResolver } from './organization/organization.resolver';

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
  providers: [OrganizationResolver],
})
export class GraphqlModule { }
