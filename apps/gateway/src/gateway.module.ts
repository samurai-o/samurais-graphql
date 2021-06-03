import { ConfigurationModule, environment } from '@app/configuration';
import { Module } from '@nestjs/common';
import { GraphQLGatewayModule } from '@nestjs/graphql';

const { user } = environment();

@Module({
  imports: [
    ConfigurationModule,
    GraphQLGatewayModule.forRoot({
      server: {
        playground: true,
        transformAutoSchemaFile: true,
        tracing: true,
        introspection: true,
        cors: {
          credentials: true,
          origin: true,
        },
        context: ({ req, res }) => {
          return {
            req,
            res,
          };
        },
      },
      gateway: {
        serviceHealthCheck: true,
        serviceList: [
          { name: 'user', url: `http://localhost:${user}/graphql` },
        ],
      },
    }),
  ],
})
export class GatewayModule {}
