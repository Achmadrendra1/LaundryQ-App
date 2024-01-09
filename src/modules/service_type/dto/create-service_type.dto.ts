import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export enum Unit {
  Kg = "Kg",
  Pcs = "Pcs"
}
export class CreateServiceTypeDto {
  @ApiProperty({ example: 'Cuci Kiloan' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Kg' })
  @IsNotEmpty()
  @IsEnum(Unit)
  unit: Unit;
}
