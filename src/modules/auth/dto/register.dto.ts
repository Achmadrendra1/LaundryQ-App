import {
  IsEmail,
  IsNotEmpty,
  IsInt,
  IsString,
  IsBoolean,
  Length,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

@ValidatorConstraint({ name: 'customText', async: false })
export class CustomTextValidator implements ValidatorConstraintInterface {
  validate(text: string) {
    return text.length > 8;
  }

  defaultMessage() {
    return 'Password must be more than 8 characters';
  }
}

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export class RegisterDto {
  @ApiProperty({ example: 'username' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'example@mail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  @Length(8, 255, { message: 'Password must be between 8 and 255 characters' })
  password: string;

  @ApiProperty({ example: 'Jhon Doe' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: '8XXXXXXXXX' })
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({ example: 'MALE' })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  // @ApiProperty({
  //   example:
  //     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
  // })
  // @Type(() => Buffer)
  // image: string;
}
