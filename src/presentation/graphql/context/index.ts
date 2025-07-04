import { Request } from 'express';
import { TokenService } from '@domain/identity/services/TokenService';
import { AuthContext, buildAuthContext } from './AuthContext';
import { buildDataLoaderContext, DataLoaderContext } from './DataLoaderContext';

export type GraphQLContext = AuthContext & DataLoaderContext;

export const createGraphQLContext = (tokenService: TokenService) => {
  return async ({ req }: { req: Request }): Promise<GraphQLContext> => {
    const authContext = buildAuthContext({ req, tokenService });
    const dataLoaderContext = buildDataLoaderContext();

    return {
      ...authContext,
      ...dataLoaderContext,
    };
  };
};
