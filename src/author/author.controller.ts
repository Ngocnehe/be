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
import { AuthorService } from './author.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RoleAuthGuard } from 'src/auth/guard/role-jwt.guard';
import { Role } from 'src/auth/decorator/role.enum';
import { Roles } from 'src/auth/decorator/role-decorator';
import { CreateAuthorDto } from './dto/create-author.dto';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { buildPagination } from 'src/common/common';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly service: AuthorService) {}

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post()
  async create(@Body() author: CreateAuthorDto) {
    return await this.service.createAuthor(author);
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getAll(@Query() params: ParamPaginationDto) {
    const authors = await this.service.findAll(params);
    return buildPagination(authors, params);
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const author = await this.service.deleteById(id);
    return 'Đã xóa author thành công';
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Put(':id')
  update(@Param('id') id: string, @Body() product: UpdateAuthorDto) {
    return this.service.updateById(id, product);
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
