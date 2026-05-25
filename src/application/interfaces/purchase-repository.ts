import { Purchase } from '../../domain/entities/purchase';

export interface PurchaseRepository {
  save(purchase: Purchase): void;
  findById(id: string): Purchase | null;
}
