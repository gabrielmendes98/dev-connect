import { Request } from 'express';
import { TokenPayload, TokenService } from '@domain/identity/services/TokenService';
import { UnauthorizedError } from '@domain/shared/errors/HttpErrors';
import { Logger } from '@application/shared/ports/Logger';

export interface AuthContext {
  auth: TokenPayload | null;
}

export interface BuildAuthContextArgs {
  req: Request;
  tokenService: TokenService;
  logger: Logger;
}

export const buildAuthContext = ({
  req,
  tokenService,
  logger,
}: BuildAuthContextArgs): AuthContext => {
  if (req.body.operationName === 'IntrospectionQuery') {
    logger.debug('buildAuthContext: IntrospectionQuery auth bypass');
    return { auth: null };
  }

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const payload = tokenService.verify(token);
      if (payload) {
        return { auth: payload };
      }
    } catch (error) {
      logger.error('buildAuthContext: Error in token validation:', { error });
      throw new UnauthorizedError('Invalid or expired token.');
    }
  }

  throw new UnauthorizedError('Token not provided or malformed.');
};
