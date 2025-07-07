// TODO: Remove this and type resolvers
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TagRepository } from '@domain/content/repositories/TagRepository';
import { InternalServerError } from '@domain/shared/errors/HttpErrors';
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
