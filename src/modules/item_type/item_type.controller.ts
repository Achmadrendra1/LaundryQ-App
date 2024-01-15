import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ItemTypeService } from './item_type.service';
import { CreateItemTypeDto } from './dto/create-item_type.dto';
import { UpdateItemTypeDto } from './dto/update-item_type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRoleAdmin } from '../auth/auth.guard';
import { ResponseMessage } from 'src/helpers/decorators/response.decorator';
import { ITEM_ALL, ITEM_DELETED, ITEM_INSERTED, ITEM_ONE, ITEM_UPDATED } from 'src/helpers/constants/response.constants';

@ApiBearerAuth()
@UseGuards(AuthRoleAdmin)
@ApiTags('Item Type')
@Controller('item-type')
export class ItemTypeController {
  constructor(private readonly itemTypeService: ItemTypeService) {}

  @Post()
  @ResponseMessage(ITEM_INSERTED)
  create(@Body() createItemTypeDto: CreateItemTypeDto) {
    return this.itemTypeService.create(createItemTypeDto);
  }

  @Get()
  @ResponseMessage(ITEM_ALL)
  findAll() {
    return this.itemTypeService.findAll();
  }

  @Get(':id')
  @ResponseMessage(ITEM_ONE)
  findOne(@Param('id') id: string) {
    return this.itemTypeService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(ITEM_UPDATED)
  update(
    @Param('id') id: string,
    @Body() updateItemTypeDto: UpdateItemTypeDto,
  ) {
    return this.itemTypeService.update(id, updateItemTypeDto);
  }

  @Delete(':id')
  @ResponseMessage(ITEM_DELETED)
  remove(@Param('id') id: string) {
    return this.itemTypeService.remove(id);
  }
}
