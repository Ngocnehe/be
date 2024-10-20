import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.Module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CustomerModule } from './customer/customer.module';
import { AuthorModule } from './author/author.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { CheckoutModule } from './checkout/checkout.module';
import { MailModule } from './mail/mail.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    CloudinaryModule,
    CustomerModule,
    AuthorModule,
    CartModule,
    OrderModule,
    CheckoutModule,
    MailModule,
    ReportModule,
  ],
})
export class AppModule {}
