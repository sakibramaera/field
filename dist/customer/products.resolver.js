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
exports.CustomersResolver = void 0;
const nestjs_prisma_1 = require("nestjs-prisma");
const graphql_1 = require("@nestjs/graphql");
const prisma_relay_cursor_connection_1 = require("@devoxa/prisma-relay-cursor-connection");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const common_1 = require("@nestjs/common");
const pagination_args_1 = require("../common/pagination/pagination.args");
const user_decorator_1 = require("../common/decorators/user.decorator");
const user_model_1 = require("../users/models/user.model");
const gql_auth_guard_1 = require("../auth/gql-auth.guard");
const customer_id_args_1 = require("./args/customer-id.args");
const user_id_args_1 = require("./args/user-id.args");
const customer_model_1 = require("./models/customer.model");
const customer_connection_model_1 = require("./models/customer-connection.model");
const post_customer_input_1 = require("./dto/post-customer.input");
const createCustomer_input_1 = require("./dto/createCustomer.input");
const pubSub = new graphql_subscriptions_1.PubSub();
let CustomersResolver = class CustomersResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
    customerCreated() {
        return pubSub.asyncIterator('orderCreated');
    }
    async createCustomer(user, data) {
        const newPost = this.prisma.customer.create({
            data: {
                published: true,
                name: data.name,
                address: data.address,
                mobile_number: data.mobile_number,
                authorId: user.id,
            },
        });
        return newPost;
    }
    async publishedPosts({ after, before, first, last }, query, productBy) {
        const a = await (0, prisma_relay_cursor_connection_1.findManyCursorConnection)((args) => this.prisma.customer.findMany(Object.assign({ include: { author: true }, where: {
                published: true,
                name: { contains: query || '' },
            } }, args)), () => this.prisma.customer.count({
            where: {
                published: true,
                name: { contains: query || '' },
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
        return this.prisma.customer.findUnique({ where: { id: id.customerId } });
    }
    async author(customer) {
        return this.prisma.customer.findUnique({ where: { id: customer.id } }).author();
    }
};
__decorate([
    (0, graphql_1.Subscription)(() => customer_model_1.Customer),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomersResolver.prototype, "customerCreated", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => customer_model_1.Customer),
    __param(0, (0, user_decorator_1.UserEntity)()),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User,
        createCustomer_input_1.CreateCustomerInput]),
    __metadata("design:returntype", Promise)
], CustomersResolver.prototype, "createCustomer", null);
__decorate([
    (0, graphql_1.Query)(() => customer_connection_model_1.CustomerConnection),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, graphql_1.Args)({ name: 'query', type: () => String, nullable: true })),
    __param(2, (0, graphql_1.Args)({
        name: 'orderBy',
        type: () => post_customer_input_1.PostCustomer,
        nullable: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_args_1.PaginationArgs, String, post_customer_input_1.PostCustomer]),
    __metadata("design:returntype", Promise)
], CustomersResolver.prototype, "publishedPosts", null);
__decorate([
    (0, graphql_1.Query)(() => [customer_model_1.Customer]),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_id_args_1.UserIdArgs]),
    __metadata("design:returntype", void 0)
], CustomersResolver.prototype, "userPosts", null);
__decorate([
    (0, graphql_1.Query)(() => customer_model_1.Customer),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_id_args_1.CustomerIdArgs]),
    __metadata("design:returntype", Promise)
], CustomersResolver.prototype, "post", null);
__decorate([
    (0, graphql_1.ResolveField)('author', () => user_model_1.User),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_model_1.Customer]),
    __metadata("design:returntype", Promise)
], CustomersResolver.prototype, "author", null);
CustomersResolver = __decorate([
    (0, graphql_1.Resolver)(() => customer_model_1.Customer),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], CustomersResolver);
exports.CustomersResolver = CustomersResolver;
//# sourceMappingURL=products.resolver.js.map