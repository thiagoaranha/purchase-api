import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { PrismaPurchaseRepository } from '../infrastructure/prisma/prisma-purchase.repository';
import { PURCHASE_REPOSITORY } from '../application/interfaces/purchase-repository';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [
    PrismaPurchaseRepository,
    {
      provide: PURCHASE_REPOSITORY,
      useExisting: PrismaPurchaseRepository,
    },
  ],
  exports: [PURCHASE_REPOSITORY],
})
export class PurchaseModule {}
