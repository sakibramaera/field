import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { Product } from './product.model';

@ObjectType()
export class ProductConnection extends PaginatedResponse(Product) { }
