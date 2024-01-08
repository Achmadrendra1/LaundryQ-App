import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/helpers/services/prisma.service';
import {
  BadRequestException,
  NotFoundException,
} from 'src/helpers/constants/custom.exceptions';
import {
  USER_EXISTS,
  USER_NOT_FOUND,
  ERORR_PASSWORD_LENGTH,
} from 'src/helpers/constants/response.constants';
// import axios from 'axios';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(credentials: CreateUserDto) {
    // let role_id = credentials.role_id;
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

    if (checkUser) {
      throw new BadRequestException(USER_EXISTS);
    }

    if (credentials.password.length < 8) {
      throw new BadRequestException(ERORR_PASSWORD_LENGTH);
    }

    credentials.password = await bcrypt.hash(credentials.password, salt);

    const url =
      process.env.APP_BASE_URL || `http://localhost:${process.env.PORT}/v1`;
    try {
      await this.prisma.$transaction([
        this.prisma.authUser.create({
          data: {
            email: credentials.email, 
            password: credentials.password,
            username: credentials.username,
            is_verify_phone: false,
            UserProfile: {
              create: {
                full_name: credentials.full_name,
                phone_number:  "62" + credentials.phone_number,
                gender: credentials.gender,
              },
            },
          },
        }),
      ]);
      let body = {
        receipients: credentials.email,
        name: credentials.full_name,
        url: `${url}/auth/verify/${process.env.JWT_VERIFICATION_TOKEN_SECRET}?email=${credentials.email}`,
      };
      // const response = await axios.post(
      //   `${url}/email/verification-email`,
      //   body,
      // );

      // if (!response.data.statusCode && response.data.data.length == 0) {
      //   throw new BadRequestException(USER_NOT_FOUND);
      // }

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

  async findAll() {
    return this.prisma.authUser.findMany();
  }

  async findOne(id: string) {
    try {
      return await this.prisma.authUser.findUniqueOrThrow({
        where: { id },
        include: {
          UserProfile: true,
        },
      });
    } catch (err) {
      if (err.code === 'P2025') {
        throw new NotFoundException(USER_NOT_FOUND);
      }

      throw err;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.authUser.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: string) {
    const user = await this.prisma.authUser.findFirst({ where: { id } });
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    await this.prisma.$transaction([
      // this.prisma.athProfile.deleteMany({ where: { user_id: id } }),
      this.prisma.authUser.delete({ where: { id } }),
    ]);

    return `Username : ${user.username}`;
  }
}
