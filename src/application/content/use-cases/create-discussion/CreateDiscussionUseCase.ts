import { DiscussionEntity } from '../../../../domain/content/entities/DiscussionEntity';
import { DiscussionRepository } from '../../../../domain/content/repositories/DiscussionRepository';
import { UseCase } from '../../../shared/UseCase';
import { CreateDiscussionInput, CreateDiscussionOutput } from './CreateDiscussionDTO';

export class CreateDiscussionUseCase
  implements UseCase<CreateDiscussionInput, CreateDiscussionOutput>
{
  constructor(private discussionRepository: DiscussionRepository) {}

  async execute(input: CreateDiscussionInput): CreateDiscussionOutput {
    const newDiscussion = DiscussionEntity.createNewDiscussion(
      input.title,
      input.description,
      input.imageUrl || null,
      input.tagIds,
      input.createdByUserId,
    );

    await this.discussionRepository.save(newDiscussion);

    return void 0;
  }
}
