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
    return pubSub.asyncIterator('customerCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Customer)
  async addCustomer(
    @UserEntity() user: User,
    @Args('data') data: CreateCustomerInput
  ) {
    const newCustomer = this.prisma.customer.create({
      data: {
        // published: true,
        name: data.name,
        address: data.address,
        mobile_number: data.mobile_number,
        authorId: user.id,
      },
    });
    // pubSub.publish('postCreated', { postCreated: newPost });
    return newCustomer;
  }

  @Query(() => [Customer], { name: 'AllcustomerDetails' })
  findAll() {
    return this.prisma.customer.findMany({});
  }

}
