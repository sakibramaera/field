"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersResolver = void 0;
const nestjs_prisma_1 = require("nestjs-prisma");
const graphql_1 = require("@nestjs/graphql");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../common/decorators/user.decorator");
const user_model_1 = require("../users/models/user.model");
const gql_auth_guard_1 = require("../auth/gql-auth.guard");
const order_model_1 = require("./models/order.model");
const createOrder_input_1 = require("./dto/createOrder.input");
const pubSub = new graphql_subscriptions_1.PubSub();
let OrdersResolver = class OrdersResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
    orderCreated() {
        return pubSub.asyncIterator('orderCreated');
    }
    async createOrder(user, data) {
        const newOrder = this.prisma.order.create({
            data: {
                product_name: data.product_name,
                quantity: data.quantity,
                weight: data.weight,
                customer: data.customer,
                delivery_date: data.delivery_date,
                authorId: user.id,
            },
        });
        return newOrder;
    }
    findAll() {
        return this.prisma.order.findMany({});
    }
};
__decorate([
    (0, graphql_1.Subscription)(() => order_model_1.Order),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersResolver.prototype, "orderCreated", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => order_model_1.Order),
    __param(0, (0, user_decorator_1.UserEntity)()),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User,
        createOrder_input_1.CreateOrderInput]),
    __metadata("design:returntype", Promise)
], OrdersResolver.prototype, "createOrder", null);
__decorate([
    (0, graphql_1.Query)(() => [order_model_1.Order], { name: 'AllorderDetails' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersResolver.prototype, "findAll", null);
OrdersResolver = __decorate([
    (0, graphql_1.Resolver)(() => order_model_1.Order),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], OrdersResolver);
exports.OrdersResolver = OrdersResolver;
//# sourceMappingURL=orders.resolver.js.map