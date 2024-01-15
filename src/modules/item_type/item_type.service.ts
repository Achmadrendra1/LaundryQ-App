import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemTypeDto } from './dto/create-item_type.dto';
import { UpdateItemTypeDto } from './dto/update-item_type.dto';
import { BadRequestException } from 'src/helpers/constants/custom.exceptions';
import { ITEM_EXISTS, ITEM_NOT_FOUND } from 'src/helpers/constants/response.constants';
import { PrismaService } from 'src/helpers/services/prisma.service';

@Injectable()
export class ItemTypeService {
  constructor(private prisma: PrismaService) {}
  async create(createItemTypeDto: CreateItemTypeDto) {
    try {
      return await this.prisma.$transaction([
        this.prisma.itemType.create({
          data: {
            name: createItemTypeDto.name,
            price: createItemTypeDto.price,
            service_id: createItemTypeDto.service_id,
          },
        }),
      ]);
    } catch (err) {
      if (err.code === 'P2002') {
        throw new BadRequestException(ITEM_EXISTS);
      }
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    return await this.prisma.itemType.findMany();
  }

  async findOne(id: string) {
    try {
      return await this.prisma.itemType.findUniqueOrThrow({
        where: { id },
      });
    } catch (err) {
      if (err.code === 'P2025') {
        throw new BadRequestException(ITEM_NOT_FOUND);
      }
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateItemTypeDto: UpdateItemTypeDto) {
    try {
      return await this.prisma.$transaction([
        this.prisma.itemType.update({
          where: { id },
          data: updateItemTypeDto,
        })
      ])
    } catch (err) {
      if (err.code === 'P2025') {
        throw new BadRequestException(ITEM_NOT_FOUND);
      }
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.$transaction([
        this.prisma.itemType.delete({ where: { id } })
      ])
    } catch (err) {
      if (err.code === 'P2025') {
        throw new BadRequestException(ITEM_NOT_FOUND);
      }
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
