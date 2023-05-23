import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  productName: string;

  @Field()
  @IsNotEmpty()
  maker: string;

  @Field()
  @IsNotEmpty()
  productWeight: string;

  @Field()
  @IsNotEmpty()
  category: string;

  @Field()
  @IsNotEmpty()
  mfgDate: string;

  @Field()
  @IsNotEmpty()
  expDate: string;
}
