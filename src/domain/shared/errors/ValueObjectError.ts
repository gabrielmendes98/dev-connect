import { BaseError } from './BaseError';

export class ValueObjectError extends BaseError {
  constructor(message: string, statusCode: number = 400) {
    super(message, statusCode);
    this.name = 'ValueObjectError';
  }
}
