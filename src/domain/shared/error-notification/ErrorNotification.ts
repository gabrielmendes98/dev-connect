import { ValidationError } from '../errors/ValidationError';
import { ErrorObject, IErrorNotification } from './ErrorNotificationTypes';

export class ErrorNotification implements IErrorNotification {
  private errors: ErrorObject[] = [];

  constructor(public readonly context: string) {}

  public addError(errorMessage: string): void;
  public addError(error: ErrorObject): void;
  public addError(error: string | ErrorObject): void {
    if (typeof error === 'string') {
      this.errors.push({
        message: error,
        context: this.context,
      });
    } else {
      this.errors.push(error);
    }
  }

  public hasErrors() {
    return this.errors.length > 0;
  }

  public getErrors() {
    return this.errors;
  }

  public message() {
    let message = '';

    this.errors.forEach((error) => {
      message += `${error.message}; `;
    });

    return message.slice(0, -2);
  }

  public check() {
    if (this.hasErrors()) {
      throw new ValidationError(this);
    }
  }
}
