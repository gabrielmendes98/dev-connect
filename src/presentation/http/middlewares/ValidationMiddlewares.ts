import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { ApiResponse } from '../responses/ApiResponse';

export const validateRequest =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);

        ApiResponse.error(res, {
          statusCode: 400,
          message: validationError.message,
          details: validationError.details,
        });

        return;
      }

      next(error);
    }
  };
