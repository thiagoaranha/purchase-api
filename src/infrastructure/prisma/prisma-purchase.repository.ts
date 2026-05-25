import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '../../generated/prisma/client';
import { Purchase } from '../../domain/entities/purchase';
import { CurrencyCode } from '../../domain/value-objects/currency-code';
import { Description } from '../../domain/value-objects/description';
import { Money } from '../../domain/value-objects/money';
import { PurchaseId } from '../../domain/value-objects/purchase-id';
import { TransactionDate } from '../../domain/value-objects/transaction-date';
import { PurchaseRepository } from '../../application/interfaces/purchase-repository';

function formatIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

@Injectable()
export class PrismaPurchaseRepository implements PurchaseRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(purchase: Purchase): Promise<void> {
    await this.prisma.purchase.upsert({
      where: { id: purchase.id.value },
      create: {
        id: purchase.id.value,
        description: purchase.description.value,
        transactionDate: purchase.transactionDate.toDate(),
        purchaseAmountUsd: new Prisma.Decimal(
          purchase.purchaseAmountUsd.toDecimalString(),
        ),
      },
      update: {
        description: purchase.description.value,
        transactionDate: purchase.transactionDate.toDate(),
        purchaseAmountUsd: new Prisma.Decimal(
          purchase.purchaseAmountUsd.toDecimalString(),
        ),
      },
    });
  }

  async findById(id: string): Promise<Purchase | null> {
    const record = await this.prisma.purchase.findUnique({
      where: { id },
    });

    if (!record) {
      return null;
    }

    return Purchase.create({
      id: PurchaseId.create(record.id),
      description: Description.create(record.description),
      transactionDate: TransactionDate.create(
        formatIsoDate(record.transactionDate),
      ),
      purchaseAmountUsd: Money.create(
        record.purchaseAmountUsd.toFixed(2),
        CurrencyCode.usd(),
      ),
    });
  }
}
