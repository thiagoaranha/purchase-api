import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

@Injectable()
export class PrismaHealthIndicator extends HealthIndicator {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.prisma.$queryRawUnsafe('SELECT 1');
      return this.getStatus(key, true);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const result = this.getStatus(key, false, { message });
      throw new HealthCheckError('Prisma connection failed', result);
    }
  }
}
