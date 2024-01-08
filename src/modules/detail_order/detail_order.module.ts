import { Module } from '@nestjs/common';
import { DetailOrderService } from './detail_order.service';
import { DetailOrderController } from './detail_order.controller';

@Module({
  controllers: [DetailOrderController],
  providers: [DetailOrderService],
})
export class DetailOrderModule {}
