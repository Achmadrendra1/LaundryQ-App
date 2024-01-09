import { PartialType } from '@nestjs/swagger';
import { CreateServiceTypeDto, Unit } from './create-service_type.dto';

export class UpdateServiceTypeDto extends PartialType(CreateServiceTypeDto) {
    readonly name?: string
    readonly unit?: Unit
}
