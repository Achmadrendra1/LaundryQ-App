import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// import { prismaCache } from '../middlewares/prisma-cache.middleware';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    // this.$use(prismaCache);
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
