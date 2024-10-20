import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { DatabaseModule } from 'src/database/database.Module';
import { Order, OrderSchema } from './model/order.schema';
import { OrderDetail, OrderDetailSchema } from './model/order-detail.schema';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: OrderDetail.name, schema: OrderDetailSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService, OrderRepository],
})
export class OrderModule {}
