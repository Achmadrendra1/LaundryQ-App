import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ServiceTypeService } from './service_type.service';
import { CreateServiceTypeDto } from './dto/create-service_type.dto';
import { UpdateServiceTypeDto } from './dto/update-service_type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRoleAdmin } from '../auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthRoleAdmin)
@ApiTags('Service Type')
@Controller('service-type')
export class ServiceTypeController {
  constructor(private readonly serviceTypeService: ServiceTypeService) {}

  @Post()
  create(@Req() req, @Body() createServiceTypeDto: CreateServiceTypeDto) {
    return this.serviceTypeService.create(req.user, createServiceTypeDto);
  }

  @Get()
  findAll() {
    return this.serviceTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceTypeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceTypeDto: UpdateServiceTypeDto,
  ) {
    return this.serviceTypeService.update(id, updateServiceTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceTypeService.remove(id);
  }
}
