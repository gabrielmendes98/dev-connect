import merge from 'lodash.merge';
import { buildDiscussionResolvers, DiscussionResolversDependencies } from './DiscussionResolvers';

export type BuildResolversDependencies = DiscussionResolversDependencies;

export const buildResolvers = ({
  createDiscussionUseCase,
  tagRepository,
}: BuildResolversDependencies) => {
  const discussionResolvers = buildDiscussionResolvers({
    createDiscussionUseCase,
    tagRepository,
  });

  // We can add other resolvers here
  return merge(discussionResolvers);
};
