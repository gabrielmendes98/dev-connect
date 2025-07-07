// TODO: Remove this and type resolvers
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLError } from 'graphql';
import { TagRepository } from '@domain/content/repositories/TagRepository';
import { CreateDiscussionUseCase } from '@application/content/use-cases/create-discussion/CreateDiscussionUseCase';
import { GraphQLContext } from '../context';

export interface DiscussionResolversDependencies {
  createDiscussionUseCase: CreateDiscussionUseCase;
  tagRepository: TagRepository;
}

export const buildDiscussionResolvers = ({
  createDiscussionUseCase,
  tagRepository,
}: DiscussionResolversDependencies) => ({
  Query: {
    discussions: async () => {
      // TODO: Implement here
      return [];
    },
    discussion: async () => {
      // TODO: Implement here
      return null;
    },
  },
  Mutation: {
    startDiscussion: async (_: any, { input }: { input: any }, context: GraphQLContext) => {
      const userId = context.auth?.userId;

      if (!userId) {
        // TODO: Add middleware to resolvers and standardize errors
        throw new GraphQLError('Invalid credentials', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        });
      }

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
        if (error instanceof GraphQLError) {
          throw error;
        }
        // TODO: Standardize errors
        throw new GraphQLError('Unable to create discussion.', {
          extensions: { code: 'INTERNAL_SERVER_ERROR' },
        });
      }
    },
  },
  Discussion: {
    tags: async (parent: { tagIds: string[] }) => {
      if (!parent.tagIds || parent.tagIds.length === 0) {
        return [];
      }

      const tags = await tagRepository.findByIds(parent.tagIds);
      return tags.map((tag) => ({
        id: tag.getId().getValue(),
        name: tag.getName(),
      }));
    },
  },
});
