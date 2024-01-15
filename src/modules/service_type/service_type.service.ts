import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateServiceTypeDto } from './dto/create-service_type.dto';
import { UpdateServiceTypeDto } from './dto/update-service_type.dto';
import { PrismaService } from 'src/helpers/services/prisma.service';
import { NotFoundException } from 'src/helpers/constants/custom.exceptions';
import {
  SERVICE_EXISTS,
  SERVICE_NOT_FOUND,
} from 'src/helpers/constants/response.constants';

@Injectable()
export class ServiceTypeService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceTypeDto: CreateServiceTypeDto) {
    try {
      return await this.prisma.$transaction([
        this.prisma.serviceType.create({
          data: {
            name: createServiceTypeDto.name,
            unit: createServiceTypeDto.unit,
          },
        }),
      ]);
    } catch (err) {
      if (err.code === 'P2002') {
        throw new BadRequestException(SERVICE_EXISTS);
      }
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    return await this.prisma.serviceType.findMany();
  }

  async findOne(id: string) {
    try {
      return await this.prisma.serviceType.findUniqueOrThrow({
        where: { id },
      });
    } catch (err) {
      if (err.code === 'P2025') {
        throw new NotFoundException(SERVICE_NOT_FOUND);
      }
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateServiceTypeDto: UpdateServiceTypeDto) {
    try {
      return await this.prisma.$transaction([
        this.prisma.serviceType.update({
          where: { id },
          data: updateServiceTypeDto,
        }),
      ]);
    } catch (err) {
      if (err.code === 'P2025') {
        throw new NotFoundException(SERVICE_NOT_FOUND);
      }
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.$transaction([
        this.prisma.serviceType.delete({ where: { id } }),
      ]);
    } catch (err) {
      if (err.code === 'P2025') {
        throw new NotFoundException(SERVICE_NOT_FOUND);
      }
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
