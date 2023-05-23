import { InputType, registerEnumType } from '@nestjs/graphql';
import { Customer } from 'src/common/customer/customer';

export enum PostCustomerField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  published = 'published',
  name = 'name',
  address = 'address',
  mobile_number = 'mobile_number',
 
}

registerEnumType(PostCustomerField, {
  name: 'PostCustomerField',
  description: 'Properties by which post connections can be ordered.',
});

@InputType()
export class PostCustomer extends Customer {
  field: PostCustomerField;
}
