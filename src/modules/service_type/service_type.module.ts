import { Module } from '@nestjs/common';
import { ServiceTypeService } from './service_type.service';
import { ServiceTypeController } from './service_type.controller';
import { PrismaService } from 'src/helpers/services/prisma.service';
import { AuthRoleAdmin } from '../auth/auth.guard';

@Module({
  controllers: [ServiceTypeController],
  providers: [
    ServiceTypeService,
    PrismaService,
    // { provide: 'ADMIN_GUARD', useClass: AuthRoleAdmin },
  ],
})
export class ServiceTypeModule {}
