import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Customer } from 'src/customer/model/customer.schema';
import { Order } from 'src/order/model/order.schema';
import { FeedbackDto } from './dto/feedback.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async placeOrder(order: Order, customer: Customer) {
    await this.mailerService.sendMail({
      to: order.email,
      from: 'daothanhnghi9a4@gmail.com',
      subject: 'Hóa đơn thanh toán',
      template: 'place-order',
      context: {
        orderId: order._id,
        date: order.created_at,
        customer: {
          name: customer.name,
          address: order.address,
          phone_number: order.phone_number,
        },
        items: order.order_detail,
        total: order.total,
      },
    });
  }

  async forgotPassword(email: string, url: string) {
    await this.mailerService.sendMail({
      to: email,
      from: 'daothanhnghi9a4@gmail.com',
      subject: 'Thay đổi mật khẩu của bạn',
      template: 'forgot-password',
      context: {
        url: url,
      },
    });
  }

  async feedBack(feedback: FeedbackDto) {
    await this.mailerService.sendMail({
      to: 'daothanhnghi9a4@gmail.com',
      from: feedback.email,
      subject: 'Phản hồi khách hàng',
      template: 'feedback',
      context: {
        email: feedback.email,
        phone_number: feedback.phone_number,
        name: feedback.name,
        message: feedback.message,
      },
    });
  }
}
