import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { productService } from './products.service';

@Module({
  imports: [],
  providers: [ProductsResolver , productService],
})
export class ProductsModule {}
