import merge from 'lodash.merge';
import { buildDiscussionResolvers, DiscussionResolversDependencies } from './DiscussionResolvers';

export type BuildResolversDependencies = DiscussionResolversDependencies;

export const buildResolvers = ({
  createDiscussionUseCase,
  listDiscussionFeedUseCase,
  logger,
}: BuildResolversDependencies) => {
  const discussionResolvers = buildDiscussionResolvers({
    createDiscussionUseCase,
    listDiscussionFeedUseCase,
    logger,
  });

  // We can add other resolvers here
  return merge(discussionResolvers);
};
