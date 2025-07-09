import { ErrorRequestHandler } from 'express';
import { BaseError } from '@domain/shared/errors/BaseError';
import { Logger } from '@application/shared/ports/Logger';
import { ApiResponse } from '../responses/ApiResponse';

interface ErrorHandlerMiddlewareDependencies {
  logger: Logger;
}

export const buildErrorHandlerMiddleware =
  ({ logger }: ErrorHandlerMiddlewareDependencies): ErrorRequestHandler =>
  (err, req, res, _next) => {
    logger.error(err.message, {
      stack: err.stack,
      path: req.path,
      method: req.method,
    });

    if (err instanceof BaseError) {
      ApiResponse.error(res, {
        statusCode: err.statusCode,
        message: err.message,
        details: err.details,
      });
      return;
    }

    ApiResponse.error(res, {
      statusCode: 500,
      message: 'Unexpected server error.',
    });
  };
