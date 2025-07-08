import { TagEntity } from '@domain/content/entities/TagEntity';
import { InternalServerError } from '@domain/shared/errors/HttpErrors';
import { CreateDiscussionUseCase } from '@application/content/use-cases/create-discussion/CreateDiscussionUseCase';
import { ListDiscussionFeedUseCase } from '@application/content/use-cases/list-discussion-feed/ListDiscussionFeedUseCase';
import { Resolvers } from '../generated/types';

export interface DiscussionResolversDependencies {
  createDiscussionUseCase: CreateDiscussionUseCase;
  listDiscussionFeedUseCase: ListDiscussionFeedUseCase;
}

export const buildDiscussionResolvers = ({
  createDiscussionUseCase,
  listDiscussionFeedUseCase,
}: DiscussionResolversDependencies): Resolvers => ({
  Query: {
    discussions: async (_, { input }) => {
      const paginatedDiscussions = await listDiscussionFeedUseCase.execute(input);

      return {
        items: paginatedDiscussions.items,
        nextCursor: paginatedDiscussions.nextCursor,
      };
    },
    discussion: async () => {
      return null;
    },
  },
  Mutation: {
    startDiscussion: async (_, { input }, context) => {
      const userId = context.auth!.userId;

      try {
        const result = await createDiscussionUseCase.execute({
          createdByUserId: userId,
          description: input.description,
          tagIds: input.tags || [],
          title: input.title,
        });
        return {
          success: true,
          message: 'Discussion created!',
          discussion: result,
        };
      } catch (error) {
        console.log('Error when creating discussion:', error);
        throw new InternalServerError('Unable to create discussion.');
      }
    },
  },
  Discussion: {
    id: (parent) => {
      return parent.getId().getValue();
    },
    createdByUserId: (parent) => {
      return parent.getCreatedByUserId().getValue();
    },
    createdAt: (parent) => {
      return parent.getCreatedAt().toISOString();
    },
    tags: async (parent, _, context) => {
      const tagIds = parent.getTagIds();

      if (!tagIds || tagIds.length === 0) {
        return [];
      }

      const data = await context.loaders.tagLoader.loadMany(tagIds.map((id) => id.getValue()));

      return data
        .filter((tag): tag is TagEntity => !(tag instanceof Error))
        .map((tag) => ({
          id: tag.getId().getValue(),
          name: tag.getName(),
        }));
    },
  },
});
