import { NextFunction, Request, Response } from 'express';
import { TokenService } from '@domain/identity/services/TokenService';
import { UnauthorizedError } from '@domain/shared/errors/HttpErrors';

interface AuthMiddlewareDependencies {
  tokenService: TokenService;
}

export const buildAuthMiddleware = ({ tokenService }: AuthMiddlewareDependencies) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('Token not provided or malformed.');
      }
      const token = authHeader.split(' ')[1];
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
};
