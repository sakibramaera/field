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

  @Query(() => OrderConnection)
  async publishedPosts(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => PostOrder,
      nullable: true,
    })
    orderBy: PostOrder
  ) {
    const a = await findManyCursorConnection(
      (args) =>
        this.prisma.order.findMany({
          include: { author: true },
          where: {
            published: true,
            product_name: { contains: query || '' },
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : undefined,
          ...args,
        }),
      () =>
        this.prisma.order.count({
          where: {
            published: true,
            product_name: { contains: query || '' },
          },
        }),
      { first, last, before, after }
    );
    return a;
  }

  @Query(() => [Order])
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

  @Query(() => Order)
  async post(@Args() id: OrderIdArgs) {
    return this.prisma.order.findUnique({ where: { id: id.orderId } });
  }

  @ResolveField('author', () => User)
  async author(@Parent() order: Order) {
    return this.prisma.order.findUnique({ where: { id: order.id } }).author();
  }
}
