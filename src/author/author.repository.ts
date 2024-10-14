import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './model/author.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectModel(Author.name) private readonly model: Model<Author>,
  ) {}

  create(author: Author) {
    return new this.model({
      ...author,
    }).save();
  }

  async findAll(
    page: number,
    limit: number,
    sort: 'asc' | 'desc',
    keyword: any,
  ) {
    return await this.model
      .find(keyword ? { $or: [{ name: new RegExp(keyword, 'i') }] } : {})
      .skip((page - 1) * limit)
      .sort({ name: sort })
      .limit(limit)
      .lean<Author[]>(true);
  }

  async findOne(id: string) {
    return await this.model.findOne({ _id: id }).lean<Author>(true);
  }

  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id }).lean<Author>(true);
  }

  async updateOne(id: string, product: Author) {
    return await this.model
      .findOneAndUpdate({ _id: id }, product, { new: true })
      .lean<Author>(true);
  }
}
