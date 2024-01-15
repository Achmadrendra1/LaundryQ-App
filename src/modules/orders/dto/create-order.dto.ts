import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum Status {
  RECEIVED = 'RECEIVED',
  PROCESS = 'PROCESS',
  FINISH = 'FINISH',
  COMPLETED = 'COMPLETED'
}

export class CreateOrderDto {
  @ApiProperty({ example: 'TRX#20240105-0001' })
  @IsString()
  @IsNotEmpty()
  bill_no: string;

  @ApiProperty({ example: 'd0efd22c-1300-4bc0-b13d-afde313e5614' })
  @IsString()
  @IsNotEmpty()
  user_id: string

  @ApiProperty({ example: 'RECEIVED' })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  @IsDate()
  @IsNotEmpty()
  date_received: Date

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  @IsDate()
  date_pickup: Date

  @IsString()
  @IsNotEmpty()
  item_id: string

  @IsNumber()
  @IsNotEmpty()
  quantity: number
}
