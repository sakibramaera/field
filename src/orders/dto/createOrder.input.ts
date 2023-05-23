import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field()
  @IsNotEmpty()
  product_name: string;

  @Field()
  @IsNotEmpty()
  quantity: string;

  @Field()
  @IsNotEmpty()
  weight: string;

  @Field()
  @IsNotEmpty()
  customer: string;

  @Field()
  @IsNotEmpty()
  delivery_date: string;
}
