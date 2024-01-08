import { PartialType } from '@nestjs/swagger';
import { CreateDetailOrderDto } from './create-detail_order.dto';

export class UpdateDetailOrderDto extends PartialType(CreateDetailOrderDto) {}
