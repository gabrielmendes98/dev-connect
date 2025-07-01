import { Request } from 'express';
import { JwtTokenService } from '../../../infrastructure/service-adapters/JwtTokenService';
import { TokenPayload } from '../../../domain/identity/services/TokenService';

export interface GraphQLAuthContext {
  auth: TokenPayload | null;
}

export const graphqlAuthContext = async ({
  req,
}: {
  req: Request;
}): Promise<GraphQLAuthContext> => {
  // TODO: Inject TokenService
  const tokenService = new JwtTokenService();

  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const payload = tokenService.verify(token);
      if (payload) {
        return { auth: payload };
      }
    }
  } catch (_) {
    console.log('No valid token found in GraphQL request.');
  }

  return { auth: null };
};
