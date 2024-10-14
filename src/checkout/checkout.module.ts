import { Module } from '@nestjs/common';
import e from 'express';
import { CheckOutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';

@Module({
  imports: [],
  controllers: [CheckoutController],
  providers: [CheckOutService],
  exports: [],
})
export class CheckoutModule {}
