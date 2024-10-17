import { Module } from '@nestjs/common';
import { CheckOutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { CartModule } from 'src/cart/cart.module';
import { ProductModule } from 'src/product/product.module';
import { OrderModule } from 'src/order/order.module';
import { MailModule } from 'src/mail/mail.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [CartModule, ProductModule, OrderModule, MailModule, CustomerModule],
  controllers: [CheckoutController],
  providers: [CheckOutService],
  exports: [],
})
export class CheckoutModule {}
