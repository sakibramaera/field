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
const graphql_subscriptions_1 = require("graphql-subscriptions");
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../common/decorators/user.decorator");
const user_model_1 = require("../users/models/user.model");
const gql_auth_guard_1 = require("../auth/gql-auth.guard");
const product_model_1 = require("./models/product.model");
const createProduct_input_1 = require("./dto/createProduct.input");
const pubSub = new graphql_subscriptions_1.PubSub();
let ProductsResolver = class ProductsResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
    productCreated() {
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
    findAll() {
        return this.prisma.product.findMany({});
    }
};
__decorate([
    (0, graphql_1.Subscription)(() => product_model_1.Product),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "productCreated", null);
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
    (0, graphql_1.Query)(() => [product_model_1.Product], { name: 'allproductDetails' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "findAll", null);
ProductsResolver = __decorate([
    (0, graphql_1.Resolver)(() => product_model_1.Product),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], ProductsResolver);
exports.ProductsResolver = ProductsResolver;
//# sourceMappingURL=products.resolver.js.map