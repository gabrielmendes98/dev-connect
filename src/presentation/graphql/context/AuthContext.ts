import { Request } from 'express';
import { TokenPayload } from '@domain/identity/services/TokenService';
import { JwtTokenService } from '@infrastructure/service-adapters/JwtTokenService';

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
  } catch (error) {
    console.log('graphqlAuth: No valid token found in GraphQL request:', error);
  }

  return { auth: null };
};
