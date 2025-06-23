import { ErrorRequestHandler } from 'express';
import { BaseError } from '../../../domain/shared/errors/BaseError';
import { ApiResponse } from '../responses/ApiResponse';

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  // TODO: Change for Winston logger
  console.error(`[Error] ${err.stack}`);

  if (err instanceof BaseError) {
    ApiResponse.error(res, {
      statusCode: err.statusCode,
      message: err.message,
    });
    return;
  }

  ApiResponse.error(res, {
    statusCode: 500,
    message: 'Unexpected server error.',
  });
};
