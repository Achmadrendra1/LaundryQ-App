import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateItemTypeDto {
  @ApiProperty({ example: 'Kiloan' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 7000 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'd0efd22c-1300-4bc0-b13d-afde313e5614' })
  @IsString()
  @IsNotEmpty()
  service_id: string;
}
