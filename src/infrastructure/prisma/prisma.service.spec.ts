import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaService } from './prisma.service';
import { DatabaseUrlRequiredError } from './errors/database-url-required.error';

const mockConnect = jest.fn();
const mockDisconnect = jest.fn();
let mockConstructorOptions: unknown;

jest.mock('../../shared/config/env', () => ({}));

jest.mock('../../generated/prisma/client', () => {
  class MockPrismaClient {
    $connect = mockConnect;
    $disconnect = mockDisconnect;

    constructor(options?: unknown) {
      mockConstructorOptions = options;
    }
  }

  return { PrismaClient: MockPrismaClient };
});

jest.mock('@prisma/adapter-pg', () => ({
  PrismaPg: jest.fn((options: { connectionString: string }) => ({
    connectionString: options.connectionString,
  })),
}));

describe('PrismaService', () => {
  const originalDatabaseUrl = process.env.DATABASE_URL;

  beforeEach(() => {
    mockConnect.mockClear();
    mockDisconnect.mockClear();
    (PrismaPg as jest.Mock).mockClear();
    mockConstructorOptions = undefined;
    process.env.DATABASE_URL =
      'postgresql://user:password@localhost:5432/db?schema=public';
  });

  afterAll(() => {
    process.env.DATABASE_URL = originalDatabaseUrl;
  });

  it('should configure Prisma with the PostgreSQL adapter', () => {
    const service = new PrismaService();

    expect(PrismaPg).toHaveBeenCalledWith({
      connectionString: process.env.DATABASE_URL,
    });
    expect(mockConstructorOptions).toEqual({
      adapter: {
        connectionString: process.env.DATABASE_URL,
      },
    });
    expect(service).toBeInstanceOf(PrismaService);
  });

  it('should fail fast when DATABASE_URL is missing', () => {
    delete process.env.DATABASE_URL;

    expect(() => new PrismaService()).toThrow(DatabaseUrlRequiredError);
  });

  it('should connect and disconnect through module hooks', async () => {
    const service = new PrismaService();

    await service.onModuleInit();
    await service.onModuleDestroy();

    expect(mockConnect).toHaveBeenCalledTimes(1);
    expect(mockDisconnect).toHaveBeenCalledTimes(1);
  });
});
