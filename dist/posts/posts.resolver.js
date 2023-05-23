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
exports.PostsResolver = void 0;
const nestjs_prisma_1 = require("nestjs-prisma");
const graphql_1 = require("@nestjs/graphql");
const prisma_relay_cursor_connection_1 = require("@devoxa/prisma-relay-cursor-connection");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const common_1 = require("@nestjs/common");
const pagination_args_1 = require("../common/pagination/pagination.args");
const user_decorator_1 = require("../common/decorators/user.decorator");
const user_model_1 = require("../users/models/user.model");
const gql_auth_guard_1 = require("../auth/gql-auth.guard");
const post_id_args_1 = require("./args/post-id.args");
const user_id_args_1 = require("./args/user-id.args");
const post_model_1 = require("./models/post.model");
const post_connection_model_1 = require("./models/post-connection.model");
const post_order_input_1 = require("./dto/post-order.input");
const createPost_input_1 = require("./dto/createPost.input");
const pubSub = new graphql_subscriptions_1.PubSub();
let PostsResolver = class PostsResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
    postCreated() {
        return pubSub.asyncIterator('postCreated');
    }
    async createPost(user, data) {
        const newPost = this.prisma.order.create({
            data: {
                published: true,
                name: data.name,
                product: data.product,
                quantity: data.quantity,
                delivery_date: data.delivery_date,
                delivery_location: data.delivery_location,
                authorId: user.id,
            },
        });
        pubSub.publish('postCreated', { postCreated: newPost });
        return newPost;
    }
    async publishedPosts({ after, before, first, last }, query, orderBy) {
        const a = await (0, prisma_relay_cursor_connection_1.findManyCursorConnection)((args) => this.prisma.order.findMany(Object.assign({ include: { author: true }, where: {
                published: true,
                name: { contains: query || '' },
            }, orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : undefined }, args)), () => this.prisma.order.count({
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
        return this.prisma.order.findUnique({ where: { id: id.postId } });
    }
    async author(post) {
        return this.prisma.order.findUnique({ where: { id: post.id } }).author();
    }
};
__decorate([
    (0, graphql_1.Subscription)(() => post_model_1.Post),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostsResolver.prototype, "postCreated", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Mutation)(() => post_model_1.Post),
    __param(0, (0, user_decorator_1.UserEntity)()),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User,
        createPost_input_1.CreatePostInput]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "createPost", null);
__decorate([
    (0, graphql_1.Query)(() => post_connection_model_1.PostConnection),
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
], PostsResolver.prototype, "publishedPosts", null);
__decorate([
    (0, graphql_1.Query)(() => [post_model_1.Post]),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_id_args_1.UserIdArgs]),
    __metadata("design:returntype", void 0)
], PostsResolver.prototype, "userPosts", null);
__decorate([
    (0, graphql_1.Query)(() => post_model_1.Post),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_id_args_1.PostIdArgs]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "post", null);
__decorate([
    (0, graphql_1.ResolveField)('author', () => user_model_1.User),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_model_1.Post]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "author", null);
PostsResolver = __decorate([
    (0, graphql_1.Resolver)(() => post_model_1.Post),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], PostsResolver);
exports.PostsResolver = PostsResolver;
//# sourceMappingURL=posts.resolver.js.map