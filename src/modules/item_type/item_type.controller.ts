import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemTypeService } from './item_type.service';
import { CreateItemTypeDto } from './dto/create-item_type.dto';
import { UpdateItemTypeDto } from './dto/update-item_type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Item Type')
@Controller('item-type')
export class ItemTypeController {
  constructor(private readonly itemTypeService: ItemTypeService) {}

  @Post()
  create(@Body() createItemTypeDto: CreateItemTypeDto) {
    return this.itemTypeService.create(createItemTypeDto);
  }

  @Get()
  findAll() {
    return this.itemTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemTypeDto: UpdateItemTypeDto,
  ) {
    return this.itemTypeService.update(+id, updateItemTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemTypeService.remove(+id);
  }
}
