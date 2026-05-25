export class DatabaseUrlRequiredError extends Error {
  readonly code = 'DATABASE_URL_REQUIRED';

  constructor() {
    super('DATABASE_URL is required for PrismaService');
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
