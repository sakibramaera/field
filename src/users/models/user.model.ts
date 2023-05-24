import 'reflect-metadata';
import {
  ObjectType,
  registerEnumType,
  HideField,
  Field,
} from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Order } from 'src/orders/models/order.model';
import { BaseModel } from 'src/common/models/base.model';
import { Role } from '@prisma/client';
import { Product } from 'src/products/models/product.model';
import { Customer } from 'src/customer/models/customer.model';

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

@ObjectType()
export class User extends BaseModel {
  @Field(() => String, { nullable: true })
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  firstname?: string;

  @Field(() => String, { nullable: true })
  lastname?: string;

  @Field(() => String, { nullable: true })
  mobile_no?: string;

  @Field(() => Role)
  role: Role;

  @Field(() => [Order], { nullable: true })
  orders?: [Order] | null;

  @Field(() => [Product], { nullable: true })
  products?: [Product] | null;

  @Field(() => [Customer], { nullable: true })
  customer?: [Customer] | null;

  @HideField()
  password: string;
}
