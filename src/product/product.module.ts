import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { DatabaseModule } from 'src/database/database.Module';
import { Product, ProductSchema } from './model/product.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Category } from 'src/category/model/category.schema';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CloudinaryModule,
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductRepository, ProductService],
  exports: [ProductRepository],
})
export class ProductModule {}
