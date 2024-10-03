import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ParamPaginationDto } from 'src/user/dto/param-pagination.dto';
import { Category } from './model/category.schema';

@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() category: CreateCategoryDto) {
    return this.service.createCategory(category);
  }

  // //@UseGuards(JwtAuthGuard)
  // @Get()
  // findAll() {
  //   return this.service.findAll();
  // }

  //test tìm tất cả category và phân trang
  @Get()
  async findAll(@Query() page: ParamPaginationDto) {
    const listCategorys = await this.service.findAll(page);
    return this.buildPagination(listCategorys, page);
  }

  //@UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.findById(id);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.service.deleteById(id);
  }

  //@UseGuards(JwtAuthGuard)
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() category: UpdateCategoryDto) {
    return this.service.updateById(id, category);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Query('status') status: boolean) {
    return this.service.updateStatusById(id, status);
  }

  //test phân trang
  private buildPagination(
    listCategorys: Category[],
    param: ParamPaginationDto,
  ) {
    const { page, limit } = param;
    return {
      total_items: listCategorys.length,
      total_pages: Math.ceil(listCategorys.length / limit),
      current_page: parseInt(String(page)),
      entities: listCategorys,
    };
  }
}
