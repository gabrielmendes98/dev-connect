import merge from 'lodash.merge';
import { buildDiscussionResolvers, DiscussionResolversDependencies } from './DiscussionResolvers';

export type BuildResolversDependencies = DiscussionResolversDependencies;

export const buildResolvers = ({
  createDiscussionUseCase,
  listDiscussionFeedUseCase,
}: BuildResolversDependencies) => {
  const discussionResolvers = buildDiscussionResolvers({
    createDiscussionUseCase,
    listDiscussionFeedUseCase,
  });

  // We can add other resolvers here
  return merge(discussionResolvers);
};
