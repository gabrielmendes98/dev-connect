import { Response } from 'express';

interface ErrorDetails {
  path?: (string | number)[];
  message: string;
}

interface ErrorPayload {
  statusCode: number;
  message: string;
  details?: ErrorDetails[];
}

export class ApiResponse {
  public static success<T>(res: Response, data: T, statusCode: number = 200) {
    return res.status(statusCode).json(data);
  }

  public static error(res: Response, payload: ErrorPayload) {
    return res.status(payload.statusCode).json({
      error: {
        message: payload.message,
        details: payload.details || [],
      },
    });
  }
}
