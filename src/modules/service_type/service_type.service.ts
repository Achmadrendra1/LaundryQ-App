import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateServiceTypeDto } from './dto/create-service_type.dto';
import { UpdateServiceTypeDto } from './dto/update-service_type.dto';
import { UNAUTHORIZED_ROLE } from 'src/helpers/constants/response.constants';
import { PrismaService } from 'src/helpers/services/prisma.service';

@Injectable()
export class ServiceTypeService {
  constructor(private prisma: PrismaService) {}
  async create(user: any, createServiceTypeDto: CreateServiceTypeDto) {
    if (user.role !== 'Admin') {
      throw new UnauthorizedException(UNAUTHORIZED_ROLE);
    }

    const serviceType = await this.prisma.serviceType.findFirst({
      where: {
        name: createServiceTypeDto.name,
      },
    });

    if (serviceType) {
      throw new BadRequestException('Service Type already exists');
    }

    await this.prisma.$transaction([
      this.prisma.serviceType.create({
        data: {
          name: createServiceTypeDto.name,
          unit: createServiceTypeDto.unit,
        },
      }),
    ]);
    return { ...createServiceTypeDto };
  }

  findAll() {
    return this.prisma.serviceType.findMany();
  }

  findOne(id: string) {
    return `This action returns a #${id} serviceType`;
  }

  update(id: string, updateServiceTypeDto: UpdateServiceTypeDto) {
    return `This action updates a #${id} serviceType`;
  }

  remove(id: string) {
    return `This action removes a #${id} serviceType`;
  }
}
