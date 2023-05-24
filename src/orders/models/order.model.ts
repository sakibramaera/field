import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Order extends BaseModel {
  
  @Field({ nullable: true })
  id: string;

  @Field()
  product_name: string;

  @Field()
  quantity: string;

  @Field()
  weight: string;

  @Field()
  customer: string;

  @Field()
  delivery_date: string;

  @Field(() => Boolean)
  published: boolean;

  @Field(() => User, { nullable: true })
  author?: User | null;
}
