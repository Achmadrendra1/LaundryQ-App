import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DetailOrderService } from './detail_order.service';
import { CreateDetailOrderDto } from './dto/create-detail_order.dto';
import { UpdateDetailOrderDto } from './dto/update-detail_order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Detail Order')
@Controller('detail-order')
export class DetailOrderController {
  constructor(private readonly detailOrderService: DetailOrderService) {}

  @Post()
  create(@Body() createDetailOrderDto: CreateDetailOrderDto) {
    return this.detailOrderService.create(createDetailOrderDto);
  }

  @Get()
  findAll() {
    return this.detailOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailOrderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetailOrderDto: UpdateDetailOrderDto,
  ) {
    return this.detailOrderService.update(+id, updateDetailOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailOrderService.remove(+id);
  }
}
