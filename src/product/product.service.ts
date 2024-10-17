import { Category } from './../category/model/category.schema';
import { CategoryService } from './../category/category.service';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CategoryRepository } from 'src/category/category.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { checkValisIsObject } from 'src/common/common';
import { Types } from 'mongoose';
import { Product } from './model/product.schema';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async createProduct(createProduct: CreateProductDto) {
    console.log(createProduct);
    let { category_id, author_id, ...data } = createProduct;

    checkValisIsObject(category_id, 'category_id');
    checkValisIsObject(author_id, 'author_id');

    const category = await this.categoryRepository.findOne(category_id);

    if (!category) {
      throw new NotFoundException('Khong tim thay category');
    }

    const product = {
      _id: new Types.ObjectId(),
      category_id: new Types.ObjectId(category_id),
      author_id: new Types.ObjectId(author_id),
      ...data,
    };

    try {
      return await this.productRepository.create(product as Product);
    } catch (error) {
      throw new UnprocessableEntityException('Ten san pham da ton tai');
    }
  }

  uploadMainImage(id: Types.ObjectId, { image_id, image_url }) {
    return this.productRepository.uploadMainFile(id, { image_id, image_url });
  }

  uploadExtraImages(
    id: Types.ObjectId,
    files: { image_id: string; image_url: string },
  ) {
    return this.productRepository.uploadExtraFiles(id, files);
  }

  findAll(param: ParamPaginationDto) {
    const { page, limit, sort, keyword } = param;

    const newSort = sort != 'asc' ? 'desc' : 'asc';

    return this.productRepository.findAll(page, limit, newSort, keyword);
  }

  async findById(id: string) {
    checkValisIsObject(id, 'product id');

    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException('Khong tim thay product');
    }
    return product;
  }

  async deleteById(id: string) {
    checkValisIsObject(id, 'product id');

    const product = await this.productRepository.deleteOne(id);

    if (!product) {
      throw new NotFoundException('Khong tim thay product');
    }

    return product;
  }

  async updateById(id: string, updateProduct: UpdateProductDto) {
    checkValisIsObject(id, 'product id');
    checkValisIsObject(updateProduct.category_id, 'category_id');

    const { category_id, author_id, ...data } = updateProduct;

    const category = await this.categoryRepository.findOne(category_id);

    if (!category) {
      throw new NotFoundException('Khong tim thay category');
    }

    const product = await this.productRepository.updateOne(id, {
      _id: new Types.ObjectId(id),
      category_id: new Types.ObjectId(category_id),
      author_id: new Types.ObjectId(author_id),
      ...data,
    });
    if (!product) {
      throw new NotFoundException('Khong tim thay product');
    }

    return product;
  }

  async deleteExtraImages(id: string, image_id: string[]) {
    checkValisIsObject(id, 'product id');
    const product = await this.productRepository.deleteExtraImages(
      new Types.ObjectId(id),
      image_id,
    );

    if (!product) {
      throw new NotFoundException('Khong tim thay product');
    }

    return product;
  }

  async updateStock(id: string, stock: number) {
    return await this.productRepository.updateStock(
      new Types.ObjectId(id),
      stock,
    );
  }
}
