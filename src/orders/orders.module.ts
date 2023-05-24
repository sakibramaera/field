import { Module } from '@nestjs/common';
import { OrdersResolver } from './orders.resolver';
import { orderService } from './orders.service';

@Module({
  imports: [],
  providers: [OrdersResolver, orderService ],
})
export class OrdersModule {}
