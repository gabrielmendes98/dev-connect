import { ErrorRequestHandler } from 'express';
import { BaseError } from '../../../domain/shared/errors/BaseError';

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  // TODO: Change for Winston logger
  console.error(`[Error] ${err.stack}`);

  if (err instanceof BaseError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
      },
    });
    return;
  }

  res.status(500).json({
    error: {
      message: 'Unexpected server error.',
    },
  });
};
