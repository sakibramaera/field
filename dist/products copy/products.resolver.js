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
exports.ProductsResolver = void 0;
const nestjs_prisma_1 = require("nestjs-prisma");
const graphql_1 = require("@nestjs/graphql");
const prisma_relay_cursor_connection_1 = require("@devoxa/prisma-relay-cursor-connection");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const common_1 = require("@nestjs/common");
const pagination_args_1 = require("../common/pagination/pagination.args");
const user_decorator_1 = require("../common/decorators/user.decorator");
const user_model_1 = require("../users/models/user.model");
const gql_auth_guard_1 = require("../auth/gql-auth.guard");
const product_id_args_1 = require("./args/product-id.args");
const user_id_args_1 = require("./args/user-id.args");
const product_model_1 = require("./models/product.model");
const product_connection_model_1 = require("./models/product-connection.model");
const post_product_input_1 = require("./dto/post-product.input");
const createProduct_input_1 = require("./dto/createProduct.input");
const pubSub = new graphql_subscriptions_1.PubSub();
let ProductsResolver = class ProductsResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
    orderCreated() {
        return pubSub.asyncIterator('orderCreated');
    }
    async createProduct(user, data) {
        const newPost = this.prisma.product.create({
            data: {
                published: true,
                productName: data.productName,
                maker: data.maker,
                productWeight: data.productWeight,
                category: data.category,
                mfgDate: data.mfgDate,
                expDate: data.expDate,
                authorId: user.id,
            },
        });
        return newPost;
    }
    async publishedPosts({ after, before, first, last }, query, productBy) {
        const a = await (0, prisma_relay_cursor_connection_1.findManyCursorConnection)((args) => this.prisma.product.findMany(Object.assign({ include: { author: true }, where: {
                published: true,
                productName: { contains: query || '' },
            } }, args)), () => this.prisma.product.count({
            where: {
                published: true,
                productName: { contains: query || '' },
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
        return this.prisma.product.findUnique({ where: { id: id.productId } });
    }
    async author(product) {
        return this.prisma.product.findUnique({ where: { id: product.id } }).author();
    }
};
__decorate([
    (0, graphql_1.Subscription)(() => product_model_1.Product),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "orderCreated", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => product_model_1.Product),
    __param(0, (0, user_decorator_1.UserEntity)()),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User,
        createProduct_input_1.CreateProductInput]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "createProduct", null);
__decorate([
    (0, graphql_1.Query)(() => product_connection_model_1.ProductConnection),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, graphql_1.Args)({ name: 'query', type: () => String, nullable: true })),
    __param(2, (0, graphql_1.Args)({
        name: 'orderBy',
        type: () => post_product_input_1.PostProduct,
        nullable: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_args_1.PaginationArgs, String, post_product_input_1.PostProduct]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "publishedPosts", null);
__decorate([
    (0, graphql_1.Query)(() => [product_model_1.Product]),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_id_args_1.UserIdArgs]),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "userPosts", null);
__decorate([
    (0, graphql_1.Query)(() => product_model_1.Product),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_id_args_1.ProductIdArgs]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "post", null);
__decorate([
    (0, graphql_1.ResolveField)('author', () => user_model_1.User),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_model_1.Product]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "author", null);
ProductsResolver = __decorate([
    (0, graphql_1.Resolver)(() => product_model_1.Product),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], ProductsResolver);
exports.ProductsResolver = ProductsResolver;
//# sourceMappingURL=products.resolver.js.map