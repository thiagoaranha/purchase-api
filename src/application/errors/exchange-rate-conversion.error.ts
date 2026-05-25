import { DomainError } from '../../domain/errors/domain-error';

export class UnsupportedExchangeRateCurrencyError extends DomainError {
  readonly code = 'UNSUPPORTED_EXCHANGE_RATE_CURRENCY';

  constructor(currency: string) {
    super(`Exchange rate provider does not support currency: ${currency}`);
  }
}

export class NoValidExchangeRateError extends DomainError {
  readonly code = 'NO_VALID_EXCHANGE_RATE';

  constructor(currency: string, purchaseDate: string) {
    super(
      `No valid exchange rate found for ${currency} on or before ${purchaseDate} within the previous 6 months.`,
    );
  }
}
