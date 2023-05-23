import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Parent,
  Args,
  ResolveField,
  Subscription,
  Mutation,
} from '@nestjs/graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/models/user.model';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { ProductIdArgs } from './args/product-id.args';
import { UserIdArgs } from './args/user-id.args';
import { Product } from './models/product.model';
import { ProductConnection } from './models/product-connection.model';
import { PostProduct } from './dto/post-product.input';
import { CreateProductInput } from './dto/createProduct.input';

const pubSub = new PubSub();

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private prisma: PrismaService) { }

  @Subscription(() => Product)
  productCreated() {
    return pubSub.asyncIterator('orderCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Product)
  async createProduct(
    @UserEntity() user: User,
    @Args('data') data: CreateProductInput
  ) {
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
    // pubSub.publish('postCreated', { postCreated: newPost });
    return newPost;
  }

  @Query(() => ProductConnection)
  async publishedPosts(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => PostProduct,
      nullable: true,
    })
    productBy: PostProduct
  ) {
    const a = await findManyCursorConnection(
      (args) =>
        this.prisma.product.findMany({
          include: { author: true },
          where: {
            published: true,
            productName: { contains: query || '' },
          },
          // productBy: productBy ? { [productBy.field]: productBy.direction } : undefined,
          ...args,
        }),
      () =>
        this.prisma.product.count({
          where: {
            published: true,
            productName: { contains: query || '' },
          },
        }),
      { first, last, before, after }
    );
    return a;
  }

  @Query(() => [Product])
  userPosts(@Args() id: UserIdArgs) {
    return this.prisma.user
      .findUnique({ where: { id: id.userId } })
      .orders({ where: { published: true } });

    // or
    // return this.prisma.posts.findMany({
    //   where: {
    //     published: true,
    //     author: { id: id.userId }
    //   }
    // });
  }

  @Query(() => Product)
  async post(@Args() id: ProductIdArgs) {
    return this.prisma.product.findUnique({ where: { id: id.productId } });
  }

  @ResolveField('author', () => User)
  async author(@Parent() product: Product) {
    return this.prisma.product.findUnique({ where: { id: product.id } }).author();
  }
}
