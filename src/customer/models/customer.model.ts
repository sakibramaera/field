import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Customer extends BaseModel {
  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  mobile_number: string;

  // @Field(() => Boolean)
  // published: boolean;

  @Field(() => User, { nullable: true })
  author?: User | null;
}
