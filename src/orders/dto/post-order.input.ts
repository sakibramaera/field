import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

export enum PostOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  published = 'published',
  product_name = 'product_name',
  quantity = 'quantity',
  weight = 'weight',
  customer = 'customer',
  delivery_date = 'delivery_date',
}

registerEnumType(PostOrderField, {
  name: 'PostOrderField',
  description: 'Properties by which post connections can be ordered.',
});

@InputType()
export class PostOrder extends Order {
  field: PostOrderField;
}
