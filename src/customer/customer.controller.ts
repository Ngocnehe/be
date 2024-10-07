import { changePasswordDto } from './dto/change-password.dts';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { buildPagination } from 'src/common/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  //tạo customer
  @Post('register')
  register(@Body() customer: CreateCustomerDto) {
    return this.customerService.create(customer);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    const { _id } = req.user;
    return this.customerService.findById(_id);
  }

  //lấy customer theo id
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.customerService.findById(id);
  }

  //phân trang
  @Get()
  async getAll(@Query() params: ParamPaginationDto) {
    const customers = await this.customerService.findAll(params);

    return buildPagination(customers, params);
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  update(@Request() req, @Body() customer: UpdateCustomerDto) {
    const { _id } = req.user;
    return this.customerService.updateById(_id, customer);
  }

  @UseGuards(JwtAuthGuard)
  @Put('me/change_password')
  changePassword(@Request() req, @Body() changePassword: changePasswordDto) {
    const { _id } = req.user;
    return this.customerService.updatePassword(
      _id,
      changePassword.old_password,
      changePassword.new_password,
    );
  }
}
