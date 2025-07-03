export interface ErrorObject {
  message: string;
  context: string;
}

export interface IErrorNotification {
  addError(errorMessage: string): void;
  addError(error: ErrorObject): void;
  hasErrors(): boolean;
  getErrors(): ErrorObject[];
  message(): string;
  check(): void;
}
