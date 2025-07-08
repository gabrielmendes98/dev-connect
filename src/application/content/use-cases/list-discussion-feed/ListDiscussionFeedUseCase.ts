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

    const formattedDiscussions = paginatedDiscussions.items.map((discussion) => ({
      id: discussion.getId().getValue(),
      title: discussion.getTitle(),
      description: discussion.getDescription(),
      imageUrl: discussion.getImageUrl(),
      comments: discussion.getComments().map((comment) => ({
        id: comment.getId().getValue(),
        authorId: comment.getAuthorId().getValue(),
        text: comment.getText(),
        createdAt: comment.getCreatedAt(),
      })),
      tagIds: discussion.getTagIds().map((tag) => tag.getValue()),
      createdByUserId: discussion.getCreatedByUserId().getValue(),
      createdAt: discussion.getCreatedAt(),
    }));

    return {
      items: formattedDiscussions,
      nextCursor: paginatedDiscussions.nextCursor,
    };
  }
}
