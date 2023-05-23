"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_prisma_1 = require("nestjs-prisma");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const app_resolver_1 = require("./app.resolver");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const orders_module_1 = require("./orders/orders.module");
const config_2 = require("./common/configs/config");
const apollo_1 = require("@nestjs/apollo");
const gql_config_service_1 = require("./gql-config.service");
const products_module_1 = require("./products/products.module");
const customers_module_1 = require("./customer/customers.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, load: [config_2.default] }),
            nestjs_prisma_1.PrismaModule.forRoot({
                isGlobal: true,
                prismaServiceOptions: {
                    middlewares: [
                        (0, nestjs_prisma_1.loggingMiddleware)({
                            logger: new common_1.Logger('PrismaMiddleware'),
                            logLevel: 'log',
                        }),
                    ],
                },
            }),
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloDriver,
                useClass: gql_config_service_1.GqlConfigService,
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            orders_module_1.OrdersModule,
            products_module_1.ProductsModule,
            customers_module_1.CustomersModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, app_resolver_1.AppResolver],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map