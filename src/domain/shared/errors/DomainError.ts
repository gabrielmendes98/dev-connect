import { BaseError } from './BaseError';

export class DomainError extends BaseError {
  constructor(message: string, statusCode: number = 400) {
    super(message, statusCode);
    this.name = 'DomainError';
  }
}
