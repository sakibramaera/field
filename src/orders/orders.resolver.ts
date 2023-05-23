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
import { OrderIdArgs } from './args/order-id.args';
import { UserIdArgs } from './args/user-id.args';
import { Order } from './models/order.model';
import { OrderConnection } from './models/order-connection.model';
import { PostOrder } from './dto/post-order.input';
import { CreateOrderInput } from './dto/createOrder.input';

const pubSub = new PubSub();

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private prisma: PrismaService) { }

  @Subscription(() => Order)
  orderCreated() {
    return pubSub.asyncIterator('orderCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Order)
  async createOrder(
    @UserEntity() user: User,
    @Args('data') data: CreateOrderInput
  ) {
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
    // pubSub.publish('postCreated', { postCreated: newPost });
    return newPost;
  }

  @Query(() => [Order], { name: 'AllorderDetails' })
  findAll() {
    return this.prisma.order.findMany({});
  }

}
