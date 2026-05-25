import { DomainError } from '../../domain/errors/domain-error';

export class PurchaseNotFoundError extends DomainError {
  readonly code = 'PURCHASE_NOT_FOUND';

  constructor(purchaseId: string) {
    super(`Purchase not found. Received: ${purchaseId}`);
  }
}
