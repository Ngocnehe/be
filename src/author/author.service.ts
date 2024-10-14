import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthorRepository } from './author.repository';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Types } from 'mongoose';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { checkValisIsObject } from 'src/common/common';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(private readonly repository: AuthorRepository) {}

  async createAuthor(createAuthor: CreateAuthorDto) {
    return await this.repository.create({
      _id: new Types.ObjectId(),
      ...createAuthor,
    });
  }

  findAll(param: ParamPaginationDto) {
    const { page, limit, sort, keyword } = param;

    const newSort = sort != 'asc' ? 'desc' : 'asc';

    return this.repository.findAll(page, limit, newSort, keyword);
  }

  async findById(id: string) {
    checkValisIsObject(id, 'author id');

    const author = await this.repository.findOne(id);
    if (!author) {
      throw new NotFoundException('Khong tim thay author');
    }
    return author;
  }

  async deleteById(id: string) {
    checkValisIsObject(id, 'product id');

    const author = await this.repository.deleteOne(id);

    if (!author) {
      throw new NotFoundException('Khong tim thay author');
    }

    return author;
  }

  async updateById(id: string, updateProduct: UpdateAuthorDto) {
    checkValisIsObject(id, 'author id');

    const author = await this.findById(id);
    author.name = updateProduct.name;
    author.date = updateProduct.date;

    const updateAuthor = await this.repository.updateOne(id, author);

    return updateAuthor;
  }
}
