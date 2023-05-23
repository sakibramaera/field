import { Field, InputType } from '@nestjs/graphql';
import { CustomerDirection } from './customer-direction';

@InputType({ isAbstract: true })
export abstract class Customer {
  @Field(() => CustomerDirection)
  direction: CustomerDirection;
}
