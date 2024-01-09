import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class LoginDto {
  @ApiProperty({ example: 'username' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'example@email.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  password: string;
}

export class EditProfileDto {
  @ApiProperty({ example: 'username' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'example@email.com' })
  @IsString()
  email: string;

  // @ApiProperty({
  //   example:
  //     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
  // })
  // @Type(() => Buffer)
  // image: string;

  @ApiProperty({ example: 'john doe' })
  @IsString()
  full_name: string;

  @ApiProperty({ example: '08121721721' })
  @IsString()
  phone_number: string;

  @ApiProperty({ example: 'password' })
  new_password: string;

  @ApiProperty({ example: 'password' })
  current_password: string;
}

export class EmailForgotPasswordDto {
  @ApiProperty({ example: 'example@mail.com' })
  @IsString()
  email: string;
}
