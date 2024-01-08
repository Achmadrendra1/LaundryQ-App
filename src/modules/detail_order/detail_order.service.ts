import { Injectable } from '@nestjs/common';
import { CreateDetailOrderDto } from './dto/create-detail_order.dto';
import { UpdateDetailOrderDto } from './dto/update-detail_order.dto';

@Injectable()
export class DetailOrderService {
  create(createDetailOrderDto: CreateDetailOrderDto) {
    return 'This action adds a new detailOrder';
  }

  findAll() {
    return `This action returns all detailOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailOrder`;
  }

  update(id: number, updateDetailOrderDto: UpdateDetailOrderDto) {
    return `This action updates a #${id} detailOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailOrder`;
  }
}
