// TODO: Remove this
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateDiscussionUseCase } from '../../../application/content/use-cases/create-discussion/CreateDiscussionUseCase';
import { MongoDiscussionRepository } from '../../../infrastructure/database/repositories/MongoDiscussionRepository';

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
    startDiscussion: async (_: any, { input }: { input: any }, context: any) => {
      console.log(context);
      // TODO: Get user id from authentication context
      const userId = '12312312312';

      const discussionRepository = new MongoDiscussionRepository();
      const createDiscussionUseCase = new CreateDiscussionUseCase(discussionRepository);
      const result = await createDiscussionUseCase.execute({
        ...input,
        createdByUserId: userId,
      });
      return result;
    },
  },
};
