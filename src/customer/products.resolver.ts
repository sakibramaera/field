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
import { CustomerIdArgs } from './args/customer-id.args';
import { UserIdArgs } from './args/user-id.args';
import { Customer } from './models/customer.model';
import { CustomerConnection } from './models/customer-connection.model';
import { PostCustomer } from './dto/post-customer.input';
import { CreateCustomerInput } from './dto/createCustomer.input';

const pubSub = new PubSub();

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(private prisma: PrismaService) { }

  @Subscription(() => Customer)
  customerCreated() {
    return pubSub.asyncIterator('orderCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Customer)
  async createCustomer(
    @UserEntity() user: User,
    @Args('data') data: CreateCustomerInput
  ) {
    const newPost = this.prisma.customer.create({
      data: {
        published: true,
        name: data.name,
        address: data.address,
        mobile_number: data.mobile_number,
       
        authorId: user.id,
      },
    });
    // pubSub.publish('postCreated', { postCreated: newPost });
    return newPost;
  }

  @Query(() => CustomerConnection)
  async publishedPosts(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => PostCustomer,
      nullable: true,
    })
    productBy: PostCustomer
  ) {
    const a = await findManyCursorConnection(
      (args) =>
        this.prisma.customer.findMany({
          include: { author: true },
          where: {
            published: true,
            name: { contains: query || '' },
          },
          // productBy: productBy ? { [productBy.field]: productBy.direction } : undefined,
          ...args,
        }),
      () =>
        this.prisma.customer.count({
          where: {
            published: true,
            name: { contains: query || '' },
          },
        }),
      { first, last, before, after }
    );
    return a;
  }

  @Query(() => [Customer])
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

  @Query(() => Customer)
  async post(@Args() id: CustomerIdArgs) {
    return this.prisma.customer.findUnique({ where: { id: id.customerId } });
  }

  @ResolveField('author', () => User)
  async author(@Parent() customer: Customer) {
    return this.prisma.customer.findUnique({ where: { id: customer.id } }).author();
  }
}
