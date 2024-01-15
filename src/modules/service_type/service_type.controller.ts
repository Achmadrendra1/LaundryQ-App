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
import { ServiceTypeService } from './service_type.service';
import { CreateServiceTypeDto } from './dto/create-service_type.dto';
import { UpdateServiceTypeDto } from './dto/update-service_type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRoleAdmin } from '../auth/auth.guard';
import { ResponseMessage } from 'src/helpers/decorators/response.decorator';
import { SERVICE_ALL, SERVICE_DELETED, SERVICE_INSERTED, SERVICE_ONE, SERVICE_UPDATED } from 'src/helpers/constants/response.constants';

@ApiBearerAuth()
@UseGuards(AuthRoleAdmin)
@ApiTags('Service Type')
@Controller('service-type')
export class ServiceTypeController {
  constructor(private readonly serviceTypeService: ServiceTypeService) {}

  @Post()
  @ResponseMessage(SERVICE_INSERTED)
  create(@Body() createServiceTypeDto: CreateServiceTypeDto) {
    return this.serviceTypeService.create(createServiceTypeDto);
  }
  
  @Get()
  @ResponseMessage(SERVICE_ALL)
  findAll() {
    return this.serviceTypeService.findAll();
  }
  
  @Get(':id')
  @ResponseMessage(SERVICE_ONE)
  findOne(@Param('id') id: string) {
    return this.serviceTypeService.findOne(id);
  }
  
  @Put(':id')
  @ResponseMessage(SERVICE_UPDATED)
  update(
    @Param('id') id: string,
    @Body() updateServiceTypeDto: UpdateServiceTypeDto,
  ) {
    return this.serviceTypeService.update(id, updateServiceTypeDto);
  }

  @Delete(':id')
  @ResponseMessage(SERVICE_DELETED)
  remove(@Param('id') id: string) {
    return this.serviceTypeService.remove(id);
  }
}
