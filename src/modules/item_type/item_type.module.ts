import { Module } from '@nestjs/common';
import { ItemTypeService } from './item_type.service';
import { ItemTypeController } from './item_type.controller';

@Module({
  controllers: [ItemTypeController],
  providers: [ItemTypeService],
})
export class ItemTypeModule {}
