export interface GetConvertedPurchaseInputDto {
  purchaseId: string;
  targetCurrency: string;
}

export interface GetConvertedPurchaseOutputDto {
  id: string;
  description: string;
  transactionDate: string;
  purchaseAmountUsd: string;
  targetCurrency: string;
  exchangeRate: string;
  convertedAmount: string;
}
