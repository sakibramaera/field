import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { Customer } from './customer.model';

@ObjectType()
export class CustomerConnection extends PaginatedResponse(Customer) { }
