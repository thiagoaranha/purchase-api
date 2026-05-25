import { Purchase } from '../../domain/entities/purchase';

export const PURCHASE_REPOSITORY = Symbol('PURCHASE_REPOSITORY');

export interface PurchaseRepository {
  save(purchase: Purchase): Promise<void>;
  findById(id: string): Promise<Purchase | null>;
}
