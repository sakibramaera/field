import { Field, InputType } from '@nestjs/graphql';
import { ProductDirection } from './product-direction';

@InputType({ isAbstract: true })
export abstract class Product {
  @Field(() => ProductDirection)
  direction: ProductDirection;
}
