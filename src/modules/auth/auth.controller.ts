import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Param,
  Patch,
  Query,
  UploadedFile,
  UseInterceptors,
  Req,
  Header,
  StreamableFile,
  Res,
  Request,
  InternalServerErrorException,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, PhoneVerificationDto } from './dto';
import { EditProfileDto, EmailForgotPasswordDto } from './dto/login.dto';
import {
  LOGIN,
  REGISTER,
  USER_ONE_IMAGE,
} from 'src/helpers/constants/response.constants';
import { ResponseMessage } from 'src/helpers/decorators/response.decorator';
import { Public } from 'src/helpers/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import * as fs from 'fs';
import { join } from 'path';
// import { QuestionService } from '../question/question.service';

@ApiTags('Auth User')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(201)
  @ResponseMessage(REGISTER)
  register(@Body() createAuthDto: RegisterDto) {
    return this.authService.register(createAuthDto);
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  @ResponseMessage(LOGIN)
  login(@Body() credentialsDto: LoginDto) {
    return this.authService.login(credentialsDto);
  }

  // @Public()
  // @Post('verify/email/get-token/')
  // @HttpCode(200)
  // verifyEmailToken(@Body() EmailVerificationDto: EmailVerificationDto) {
  //   return this.authService.emailVerifyGetToken(EmailVerificationDto);
  // }

  @ApiBearerAuth()
  @Get('verify/token/')
  @HttpCode(200)
  verifyToken(@Request() req) {
    return this.authService.verifyToken(req.user);
  }

  @ApiBearerAuth()
  @Put('profile')
  @HttpCode(200)
  updateProfile(@Request() req, @Body() EditProfileDto: EditProfileDto) {
    return this.authService.updateProfile(
      req.user,
      EditProfileDto,
    );
  }

  // @Public()
  // @ResponseMessage(USER_ONE_IMAGE)
  // @Get('/image/user/:filename')
  // async getPhoto(@Param('filename') filename: string) {
  //   try {
  //     const fileUrlResponse = await this.authService.getImage(filename);
  //     if (fileUrlResponse.publicUrl !== '' && fileUrlResponse.publicUrl) {
  //       const imageUrl = fileUrlResponse.publicUrl;
  //       return imageUrl;
  //     } else {
  //       // Handle the case where the response is a StorageError
  //       throw new Error('Error while getting the image URL');
  //     }
  //   } catch (error) {
  //     // Handle any errors that may occur during the asynchronous operation
  //     throw new InternalServerErrorException(
  //       'Failed to retrieve image URL',
  //       error.message,
  //     );
  //   }
  // }

  // @Get('profile')
  // @HttpCode(200)
  // getProfile(@Request() req) {
  //   return this.authService.getProfile(req.user);
  // }

  // @Patch('profile')
  // @HttpCode(200)
  // updateProfile(@Request() req, @Body() EditProfileDto: EditProfileDto) {
  //   return this.authService.updateProfile(
  //     req.user.id,
  //     req.user,
  //     EditProfileDto,
  //   );
  // }

  // @Public()
  // @Post('forgot/password/')
  // @HttpCode(200)
  // @ResponseMessage('Forgot Password SUCCEED')
  // forgotPassword(@Body() EmailForgotPasswordDto: EmailForgotPasswordDto) {
  //   return this.authService.forgotPassword(EmailForgotPasswordDto);
  // }
}
