import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartRepository } from './cart.repository';
import { CartService } from './cart.service';
import { DatabaseModule } from 'src/database/database.Module';
import { Cart, CartSchema } from './model/cart.schema';
import { Product } from 'src/product/model/product.schema';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    ProductModule,
  ],
  controllers: [CartController],
  providers: [CartRepository, CartService],
  exports: [CartService],
})
export class CartModule {}
