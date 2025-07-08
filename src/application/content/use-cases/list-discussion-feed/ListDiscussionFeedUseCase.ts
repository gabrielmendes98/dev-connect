import { DiscussionRepository } from '@domain/content/repositories/DiscussionRepository';
import { UseCase } from '@application/shared/UseCase';
import { ListDiscussionFeedInput, ListDiscussionFeedOutput } from './ListDiscussionFeedDTO';

export class ListDiscussionFeedUseCase
  implements UseCase<ListDiscussionFeedInput, ListDiscussionFeedOutput>
{
  constructor(private readonly discussionRepository: DiscussionRepository) {}

  async execute(input: ListDiscussionFeedInput) {
    // We can improve here and create a personalized feed for each user
    const paginatedDiscussions = await this.discussionRepository.findAll(input);

    return {
      items: paginatedDiscussions.items,
      nextCursor: paginatedDiscussions.nextCursor,
    };
  }
}
