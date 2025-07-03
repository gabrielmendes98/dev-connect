import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '@domain/shared/errors/HttpErrors';
import { JwtTokenService } from '@infrastructure/service-adapters/JwtTokenService';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Token not provided or malformed.');
    }
    const token = authHeader.split(' ')[1];
    // TODO: Inject JwtTokenService
    const tokenService = new JwtTokenService();
    const payload = tokenService.verify(token);

    if (!payload) {
      throw new UnauthorizedError('Invalid or expired token.');
    }

    req.auth = payload;

    next();
  } catch (error) {
    next(error);
  }
};
