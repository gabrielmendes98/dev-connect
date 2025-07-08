// TODO: Remove this and type resolvers
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CursorPaginationInputDTO } from '@domain/shared/dtos/PaginationDTO';
import { InternalServerError } from '@domain/shared/errors/HttpErrors';
import { CreateDiscussionUseCase } from '@application/content/use-cases/create-discussion/CreateDiscussionUseCase';
import { ListDiscussionFeedUseCase } from '@application/content/use-cases/list-discussion-feed/ListDiscussionFeedUseCase';
import { GraphQLContext } from '../context';

export interface DiscussionResolversDependencies {
  createDiscussionUseCase: CreateDiscussionUseCase;
  listDiscussionFeedUseCase: ListDiscussionFeedUseCase;
}

export const buildDiscussionResolvers = ({
  createDiscussionUseCase,
  listDiscussionFeedUseCase,
}: DiscussionResolversDependencies) => ({
  Query: {
    discussions: async (_: any, { input }: { input: CursorPaginationInputDTO }) => {
      const paginatedDiscussions = await listDiscussionFeedUseCase.execute(input);
      const discussions = paginatedDiscussions.items.map((discussion) => ({
        id: discussion.id,
        title: discussion.title,
        description: discussion.description,
        createdByUserId: discussion.createdByUserId,
        comments: discussion.comments,
        tagIds: discussion.tagIds,
        createdAt: discussion.createdAt,
      }));

      return {
        items: discussions,
        nextCursor: paginatedDiscussions.nextCursor,
      };
    },
    discussion: async () => {
      return null;
    },
  },
  Mutation: {
    startDiscussion: async (_: any, { input }: { input: any }, context: GraphQLContext) => {
      const userId = context.auth!.userId;

      try {
        const result = await createDiscussionUseCase.execute({
          createdByUserId: userId,
          description: input.description,
          tagIds: input.tags,
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
    tags: async (parent: { tagIds: string[] }, _: any, context: GraphQLContext) => {
      if (!parent.tagIds || parent.tagIds.length === 0) {
        return [];
      }

      return context.loaders.tagLoader.loadMany(parent.tagIds);
    },
  },
});
