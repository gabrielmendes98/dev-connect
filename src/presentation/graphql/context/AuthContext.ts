import { Request } from 'express';
import { TokenPayload, TokenService } from '@domain/identity/services/TokenService';

export interface AuthContext {
  auth: TokenPayload | null;
}

export interface BuildAuthContextArgs {
  req: Request;
  tokenService: TokenService;
}

export const buildAuthContext = ({ req, tokenService }: BuildAuthContextArgs): AuthContext => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const payload = tokenService.verify(token);
      if (payload) {
        return { auth: payload };
      }
    }
  } catch (error) {
    console.log('graphqlAuth: No valid token found in GraphQL request:', error);
  }

  return { auth: null };
};
