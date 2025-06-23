import { BaseError } from './BaseError';

export class EntityError extends BaseError {
  constructor(message: string, statusCode: number = 400) {
    super(message, statusCode);
    this.name = 'EntityError';
  }
}
