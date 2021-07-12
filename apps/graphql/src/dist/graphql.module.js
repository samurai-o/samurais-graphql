"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GraphqlModule = void 0;
var configuration_1 = require("@app/configuration");
var prismastore_1 = require("@app/prismastore");
var graphql_1 = require("@nestjs/graphql");
var common_1 = require("@nestjs/common");
var authorization_1 = require("@app/authorization");
var loaders_1 = require("./loaders");
var organization_resolver_1 = require("./organization/organization.resolver");
var GraphqlModule = /** @class */ (function () {
    function GraphqlModule() {
    }
    GraphqlModule = __decorate([
        common_1.Module({
            imports: [
                configuration_1.ConfigurationModule,
                prismastore_1.PrismastoreModule,
                authorization_1.AuthorizationModule,
                graphql_1.GraphQLModule.forRootAsync({
                    inject: [prismastore_1.PrismastoreService],
                    useFactory: function (prisma) {
                        return {
                            tracing: true,
                            introspection: true,
                            playground: true,
                            cacheControl: true,
                            debug: true,
                            transformAutoSchemaFile: true,
                            cors: false,
                            context: function (_a) {
                                var req = _a.req, res = _a.res;
                                return {
                                    req: req,
                                    res: res,
                                    prisma: prisma,
                                    loaders: {
                                        organazition: loaders_1.createOrganazitionLoader(prisma)
                                    }
                                };
                            },
                            autoSchemaFile: 'graphql/schema.graphql'
                        };
                    }
                }),
            ],
            providers: [organization_resolver_1.OrganizationResolver]
        })
    ], GraphqlModule);
    return GraphqlModule;
}());
exports.GraphqlModule = GraphqlModule;
