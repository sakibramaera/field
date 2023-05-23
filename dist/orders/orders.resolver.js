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
const prisma_relay_cursor_connection_1 = require("@devoxa/prisma-relay-cursor-connection");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const common_1 = require("@nestjs/common");
const pagination_args_1 = require("../common/pagination/pagination.args");
const user_decorator_1 = require("../common/decorators/user.decorator");
const user_model_1 = require("../users/models/user.model");
const gql_auth_guard_1 = require("../auth/gql-auth.guard");
const order_id_args_1 = require("./args/order-id.args");
const user_id_args_1 = require("./args/user-id.args");
const order_model_1 = require("./models/order.model");
const order_connection_model_1 = require("./models/order-connection.model");
const post_order_input_1 = require("./dto/post-order.input");
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
        const newPost = this.prisma.order.create({
            data: {
                published: true,
                product_name: data.product_name,
                quantity: data.quantity,
                weight: data.weight,
                customer: data.customer,
                delivery_date: data.delivery_date,
                authorId: user.id,
            },
        });
        return newPost;
    }
    async publishedPosts({ after, before, first, last }, query, orderBy) {
        const a = await (0, prisma_relay_cursor_connection_1.findManyCursorConnection)((args) => this.prisma.order.findMany(Object.assign({ include: { author: true }, where: {
                published: true,
                product_name: { contains: query || '' },
            }, orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : undefined }, args)), () => this.prisma.order.count({
            where: {
                published: true,
                product_name: { contains: query || '' },
            },
        }), { first, last, before, after });
        return a;
    }
    userPosts(id) {
        return this.prisma.user
            .findUnique({ where: { id: id.userId } })
            .orders({ where: { published: true } });
    }
    async post(id) {
        return this.prisma.order.findUnique({ where: { id: id.orderId } });
    }
    async author(order) {
        return this.prisma.order.findUnique({ where: { id: order.id } }).author();
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
    (0, graphql_1.Query)(() => order_connection_model_1.OrderConnection),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, graphql_1.Args)({ name: 'query', type: () => String, nullable: true })),
    __param(2, (0, graphql_1.Args)({
        name: 'orderBy',
        type: () => post_order_input_1.PostOrder,
        nullable: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_args_1.PaginationArgs, String, post_order_input_1.PostOrder]),
    __metadata("design:returntype", Promise)
], OrdersResolver.prototype, "publishedPosts", null);
__decorate([
    (0, graphql_1.Query)(() => [order_model_1.Order]),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_id_args_1.UserIdArgs]),
    __metadata("design:returntype", void 0)
], OrdersResolver.prototype, "userPosts", null);
__decorate([
    (0, graphql_1.Query)(() => order_model_1.Order),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_id_args_1.OrderIdArgs]),
    __metadata("design:returntype", Promise)
], OrdersResolver.prototype, "post", null);
__decorate([
    (0, graphql_1.ResolveField)('author', () => user_model_1.User),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_model_1.Order]),
    __metadata("design:returntype", Promise)
], OrdersResolver.prototype, "author", null);
OrdersResolver = __decorate([
    (0, graphql_1.Resolver)(() => order_model_1.Order),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], OrdersResolver);
exports.OrdersResolver = OrdersResolver;
//# sourceMappingURL=orders.resolver.js.map