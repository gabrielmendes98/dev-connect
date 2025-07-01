// TODO: Remove this
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateDiscussionUseCase } from '../../../application/content/use-cases/create-discussion/CreateDiscussionUseCase';
import { UnauthorizedError } from '../../../domain/shared/errors/HttpErrors';
import { MongoDiscussionRepository } from '../../../infrastructure/database/repositories/MongoDiscussionRepository';
import { GraphQLAuthContext } from '../context/AuthContext';

export const discussionResolvers = {
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
    startDiscussion: async (_: any, { input }: { input: any }, context: GraphQLAuthContext) => {
      const userId = context.auth?.userId;

      if (!userId) {
        // TODO: Add middleware to resolvers
        throw new UnauthorizedError('Invalid credentials');
      }

      const discussionRepository = new MongoDiscussionRepository();
      const createDiscussionUseCase = new CreateDiscussionUseCase(discussionRepository);
      const result = await createDiscussionUseCase.execute({
        createdByUserId: userId,
        description: input.description,
        tagIds: input.tags,
        title: input.title,
      });
      return result;
    },
  },
};
