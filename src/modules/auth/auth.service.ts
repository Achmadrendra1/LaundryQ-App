import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto, PhoneVerificationDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/helpers/services/prisma.service';
import {
  BadRequestException,
  NotFoundException,
} from 'src/helpers/constants/custom.exceptions';
import {
  USER_EXISTS,
  USER_NOT_FOUND,
  WRONG_CREDENTIALS,
  ERORR_PASSWORD_LENGTH,
  USER_NOT_ACTIVE,
  DUPLICATE_PASSWORD,
} from 'src/helpers/constants/response.constants';
// import axios from 'axios';
import { createWriteStream } from 'fs';
// import { createClient } from '@supabase/supabase-js';
// import { StorageService } from '../storage/storage.service';
// import { EmailService } from '../email/email.service';
// import {
//   SendEmailDTO,
//   SendEmailResponseDTO,
// } from '../email/dto/create-email.dto';
import { EditProfileDto, EmailForgotPasswordDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly publicStoragePath: string;
  constructor(
    private JWTService: JwtService,
    private prisma: PrismaService,
  ) {
    this.publicStoragePath = './public/img/profile';
  }

  async login(credentials: LoginDto) {
    const user = await this.prisma.authUser.findFirst({
      where: {
        OR: [
          {
            email: credentials.email,
          },
          {
            username: credentials.username,
          },
        ],
      },
    });
    if (!user) {
      throw new BadRequestException(USER_NOT_FOUND);
    }
    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException(WRONG_CREDENTIALS);
    }

    const profile = await this.prisma.userProfile.findFirst({
      where: {
        user_id: user.id,
      },
    });

    //ToDo initialize whatsapp
    try {
      const auth = {
        id: user.id,
        profile_id: profile.id,
        name: profile.full_name,
        username: user.username,
        email: user.email,
        phone_number: profile.phone_number,
        role: user.role,
        is_verify: user.is_verify_phone,
      };
      const token = await this.JWTService.sign(auth);
      return {
        access_token: token,
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  async register(credentials: RegisterDto) {
    const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);
    const checkUser = await this.prisma.authUser.findFirst({
      where: {
        OR: [
          {
            email: credentials.email,
          },
          {
            username: credentials.username,
          },
        ],
      },
    });

    const checkPhone = await this.prisma.userProfile.findFirst({
      where: {
        phone_number: credentials.phone_number,
      },
    });

    if (checkPhone) {
      throw new BadRequestException('Phone Number already use');
    }

    if (checkUser) {
      throw new BadRequestException(USER_EXISTS);
    }

    if (credentials.password.length < 8) {
      throw new BadRequestException(ERORR_PASSWORD_LENGTH);
    }
    const phoneRegex = /^(^\+62|62|^8)(\d{3,4}-?){2}\d{3,4}$/;
    if (!credentials.phone_number.match(phoneRegex)) {
      throw new BadRequestException('Phone number is not valid');
    }

    if (credentials.phone_number[0] === '8') {
      credentials.phone_number = '62' + credentials.phone_number;
    }

    credentials.password = await bcrypt.hash(credentials.password, salt);

    const crypto = require('crypto');
    const code = crypto.randomBytes(3).toString('hex');

    try {
      await this.prisma.$transaction([
        this.prisma.authUser.create({
          data: {
            username: credentials.username,
            password: credentials.password,
            email: credentials.email,
            is_verify_phone: false,
            verify_phone_code: code,
            UserProfile: {
              create: {
                full_name: credentials.full_name,
                phone_number: credentials.phone_number,
                gender: credentials.gender,
              },
            },
          },
        }),
      ]);

      //ToDo Whatsapp OTP

      return {
        full_name: credentials.full_name,
        username: credentials.username,
        email: credentials.email,
        phone_number: credentials.phone_number,
      };
    } catch (error) {
      throw new Error('Create failed: ' + error.message);
    }
  }

  async verifyToken(user: any): Promise<any> {
    return user;
  }

  async updateProfile(user: any, EditProfileDto: EditProfileDto): Promise<any> {
    const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);
    const checkUser = await this.prisma.authUser.findFirst({
      where: {
        id: user.id,
      },
      include: {
        UserProfile: true,
      },
    });

    if (!checkUser) {
      throw new BadRequestException(USER_NOT_FOUND);
    }

    let data_updated = {
      password: checkUser.password,
      username: EditProfileDto.username,
      email: EditProfileDto.email,
      UserProfile: {
        update: {
          full_name: EditProfileDto.full_name,
          phone_number: EditProfileDto.phone_number,
        },
      },
    };

    if (EditProfileDto.current_password) {
      const isPasswordValid = await bcrypt.compare(
        EditProfileDto.current_password,
        checkUser.password,
      );

      const isDuplicatePassword = await bcrypt.compare(
        EditProfileDto.new_password,
        checkUser.password,
      );

      if (isDuplicatePassword) {
        throw new BadRequestException(DUPLICATE_PASSWORD);
      }

      if (!isPasswordValid) {
        throw new BadRequestException(WRONG_CREDENTIALS);
      }

      data_updated.password = await bcrypt.hash(
        EditProfileDto.new_password,
        salt,
      );
    }

    await this.prisma.$transaction([
      this.prisma.authUser.update({
        where: { id: user.id },
        data: data_updated,
      }),
    ]);

    return {
      username: EditProfileDto.username,
      email: user.email,
      full_name: EditProfileDto.full_name,
    };
  }

  // async forgotPassword(EmailForgotPasswordDto: EmailForgotPasswordDto) {
    
  // }

  // async emailVerifyGetToken(EmailVerificationDto: EmailVerificationDto) {
  //   try {
  //     const updt = await this.prisma.authUser.findFirst({
  //       where: {
  //         verify_email_code: EmailVerificationDto.code,
  //         email: EmailVerificationDto.email,
  //       },
  //     });

  //     if (!updt) {
  //       throw new BadRequestException(USER_NOT_FOUND);
  //     }

  //     if (!updt.is_verify_email) {
  //       throw new BadRequestException(USER_NOT_ACTIVE);
  //     }

  //     const updatedUser = await this.prisma.authUser.update({
  //       where: { id: updt.id },
  //       data: { is_verify_email: true, verify_email_code: null },
  //     });
  //     return `Verification sucsess : ${updatedUser.username}`;
  //   } catch (error) {
  //     throw new Error('Verify failed: ' + error.message);
  //   }
  // }

  // async forgotPassword(EmailForgotPasswordDto: EmailForgotPasswordDto) {
  //   try {
  //     const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);
  //     const usr = await this.prisma.authUser.findFirst({
  //       where: {
  //         email: EmailForgotPasswordDto.email,
  //       },
  //       include: {
  //         UserProfile: true,
  //       },
  //     });

  //     if (!usr) {
  //       throw new BadRequestException(USER_NOT_FOUND);
  //     }
  //     var crypto = require('crypto');
  //     var code = crypto.randomBytes(10).toString('hex');
  //     const password = await bcrypt.hash(code, salt);

  //     const updatedUser = await this.prisma.authUser.update({
  //       where: { id: usr.id },
  //       data: {
  //         password: password,
  //       },
  //     });

  //     let body: SendEmailDTO = {
  //       subject: `Lupa Password`,
  //       receipients: [`${usr.email}`],
  //       name: usr.UserProfile.full_name,
  //       message: `Kami menerima permintaan untuk reset password akun Anda. Berikut adalah password yang baru, dan jangan lupa untuk langsung riset password anda:`,
  //       code: code,
  //     };
  //     const response = await this.emailService.sendEmail(body);
  //     return `Forgot Password sucsess : ${updatedUser.username}`;
  //   } catch (error) {
  //     throw new Error('Verify failed: ' + error.message);
  //   }
  // }

  // async getProfile(user: any): Promise<any> {
  //   let profile, role: any;

  //   profile = await this.prisma.athProfile.findFirst({
  //     where: {
  //       user_id: user.id,
  //     },
  //   });
  //   role = await this.prisma.athRole.findFirst({
  //     where: {
  //       id: user.role_id,
  //     },
  //   });
  //   return {
  //     username: user.username,
  //     email: user.email,
  //     full_name: profile.full_name,
  //     file_name: profile.file_name,
  //     role: role.name,
  //     phone_number: profile.phone_number,
  //   };
  // }

  // async getImage(fileName: string) {
  //   const filePath = `${this.publicStoragePath}/${fileName}`;
  //   try {
  //     const fileUrl = this.storageService.urlFile(filePath);
  //     return fileUrl;
  //   } catch (error) {
  //     // Rollback the transaction in case of errors
  //     throw new Error('Get Image: ' + error.message);
  //   }
  // }
}
