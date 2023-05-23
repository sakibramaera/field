import { InputType, registerEnumType } from '@nestjs/graphql';
import { Product } from 'src/common/product/product';


export enum PostProductField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  published = 'published',
  productName = 'productName',
  maker = 'maker',
  productWeight = 'productWeight',
  category = 'category',
  mfgDate = 'mfgDate',
  expDate = 'expDate',
}

registerEnumType(PostProductField, {
  name: 'PostProductField',
  description: 'Properties by which post connections can be ordered.',
});

@InputType()
export class PostProduct extends Product {
  field: PostProductField;
}
