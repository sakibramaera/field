import { Module } from '@nestjs/common';
import { CustomersResolver } from './products.resolver';

@Module({
  imports: [],
  providers: [CustomersResolver],
})
export class CustomersModule {}
