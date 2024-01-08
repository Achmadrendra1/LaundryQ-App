import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PhoneVerificationDto {
  @ApiProperty({ example: 'ABK1WT' })
  @IsString()
  code: string;

  @ApiProperty({ example: '8123456788' })
  @IsString()
  phone: string;
}
