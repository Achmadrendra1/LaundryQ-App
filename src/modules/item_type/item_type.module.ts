import { Module } from '@nestjs/common';
import { ItemTypeService } from './item_type.service';
import { ItemTypeController } from './item_type.controller';
import { PrismaService } from 'src/helpers/services/prisma.service';

@Module({
  controllers: [ItemTypeController],
  providers: [ItemTypeService, PrismaService],
})
export class ItemTypeModule {}
