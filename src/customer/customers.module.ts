import { Module } from '@nestjs/common';
import { CustomersResolver } from './customers.resolver';
import { customerService } from './customers.service';

@Module({
  imports: [],
  providers: [CustomersResolver, customerService],
})
export class CustomersModule { }
