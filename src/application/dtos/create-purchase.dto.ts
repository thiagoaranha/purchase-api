export interface CreatePurchaseInputDto {
  description: string;
  transactionDate: string;
  purchaseAmountUsd: string;
}

export interface CreatePurchaseOutputDto {
  id: string;
  description: string;
  transactionDate: string;
  purchaseAmountUsd: string;
}
