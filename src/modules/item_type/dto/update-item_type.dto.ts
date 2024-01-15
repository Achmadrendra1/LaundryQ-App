import { PartialType } from '@nestjs/swagger';
import { CreateItemTypeDto } from './create-item_type.dto';

export class UpdateItemTypeDto extends PartialType(CreateItemTypeDto) {
    readonly name?: string
    readonly price?: number
    readonly service_id?: string
}
