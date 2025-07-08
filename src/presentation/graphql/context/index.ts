import { Request } from 'express';
import { TagRepository } from '@domain/content/repositories/TagRepository';
import { TokenService } from '@domain/identity/services/TokenService';
import { AuthContext, buildAuthContext } from './AuthContext';
import { buildDataLoaderContext, DataLoaderContext } from './DataLoaderContext';

export type GraphQLContext = AuthContext & DataLoaderContext;

interface GraphQLContextArgs {
  tokenService: TokenService;
  tagRepository: TagRepository;
}

export const createGraphQLContext = ({ tokenService, tagRepository }: GraphQLContextArgs) => {
  return async ({ req }: { req: Request }): Promise<GraphQLContext> => {
    const authContext = buildAuthContext({ req, tokenService });
    const dataLoaderContext = buildDataLoaderContext({ tagRepository });

    return {
      ...authContext,
      ...dataLoaderContext,
    };
  };
};
