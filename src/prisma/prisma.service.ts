import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger('TareasService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database Connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
