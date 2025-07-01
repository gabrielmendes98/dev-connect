import { DomainError } from './DomainError';

export class NotFoundError extends DomainError {
  constructor(message: string = 'Resource not found.') {
    super(message, 404);
  }
}

export class ConflictError extends DomainError {
  constructor(message: string = 'Resource already exists.') {
    super(message, 409);
  }
}

export class UnauthorizedError extends DomainError {
  constructor(message: string = 'Unauthorized.') {
    super(message, 401);
  }
}

export class ForbiddenError extends DomainError {
  constructor(message: string = 'Forbidden.') {
    super(message, 403);
  }
}

export class InternalServerError extends DomainError {
  constructor(message: string = 'Internal Server Error.') {
    super(message, 500);
  }
}
