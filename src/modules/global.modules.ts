import { Module, Global } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { PrismaService } from 'src/helpers/services/prisma.service';
import { WhatsappController } from './whatsapp/whatsapp.controller';
import { WhatsappService } from './whatsapp/whatsapp.service';
import { ServiceTypeModule } from './service_type/service_type.module';
import { ItemTypeModule } from './item_type/item_type.module';
import { NotificationModule } from './notification/notification.module';
import { OrdersModule } from './orders/orders.module';
import { DetailOrderModule } from './detail_order/detail_order.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';

@Global()
@Module({
  imports: [
    ServiceTypeModule,
    ItemTypeModule,
    NotificationModule,
    OrdersModule,
    DetailOrderModule,
    AuthModule,
    UsersModule,
    WhatsappModule,
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [],
})
export class GlobalModule {}
