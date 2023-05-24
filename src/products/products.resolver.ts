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
  async addProduct(
    @UserEntity() user: User,
    @Args('data') data: CreateProductInput
  ) {
    const newProduct = this.prisma.product.create({
      data: {
        // published: true,
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
    return newProduct;
  }

  @Query(() => [Product], { name: 'allproductDetails' })
  findAll() {
    return this.prisma.product.findMany({});
  }

}
