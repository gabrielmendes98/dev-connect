import { IErrorNotification } from '../error-notification/ErrorNotificationTypes';
import { BaseError } from './BaseError';

export class ValidationError extends BaseError {
  constructor(errorNotification: IErrorNotification) {
    super(`Validation Error: ${errorNotification.message()}`, 422);
    this.name = 'ValidationError';
    this.details = errorNotification.getErrors();
  }
}
