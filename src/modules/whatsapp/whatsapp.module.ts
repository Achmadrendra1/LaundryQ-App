import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bullmq';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

@Module({
  controllers: [WhatsappController],
  providers: [WhatsappService],
  imports: [
    BullModule.registerQueue({
      name: 'whatsapp_queue',
    }),

    BullBoardModule.forFeature({
      name: 'whatsapp_queue',
      adapter: BullMQAdapter,
    }),
  ],
})
export class WhatsappModule {}
