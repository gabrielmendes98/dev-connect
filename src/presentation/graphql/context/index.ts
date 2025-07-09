import { Request } from 'express';
import { TagRepository } from '@domain/content/repositories/TagRepository';
import { TokenService } from '@domain/identity/services/TokenService';
import { Logger } from '@application/shared/ports/Logger';
import { AuthContext, buildAuthContext } from './AuthContext';
import { buildDataLoaderContext, DataLoaderContext } from './DataLoaderContext';

export type GraphQLContext = AuthContext & DataLoaderContext;

interface GraphQLContextArgs {
  tokenService: TokenService;
  tagRepository: TagRepository;
  logger: Logger;
}

export const createGraphQLContext = ({
  tokenService,
  tagRepository,
  logger,
}: GraphQLContextArgs) => {
  return async ({ req }: { req: Request }): Promise<GraphQLContext> => {
    const authContext = buildAuthContext({ req, tokenService, logger });
    const dataLoaderContext = buildDataLoaderContext({ tagRepository });

    return {
      ...authContext,
      ...dataLoaderContext,
    };
  };
};
