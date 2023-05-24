import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Product extends BaseModel {

  @Field({ nullable: true })
  id: string;
  
  @Field()
  productName: string;

  @Field()
  maker: string;

  @Field()
  productWeight: string;

  @Field()
  category: string;

  @Field()
  mfgDate: string;

  @Field()
  expDate: string;

  @Field(() => Boolean)
  published: boolean;

  @Field(() => User, { nullable: true })
  author?: User | null;
}
