import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto, Status } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    readonly status?: Status
    readonly date_pickup?: Date
}
