import { DiscussionEntity } from '@domain/content/entities/DiscussionEntity';
import { DiscussionRepository } from '@domain/content/repositories/DiscussionRepository';
import { DiscussionMapper } from '../mappers/DiscussionMapper';
import { DiscussionModel } from '../mongoose/models/DiscussionModel';

export class MongoDiscussionRepository implements DiscussionRepository {
  async save(discussion: DiscussionEntity): Promise<void> {
    const persistenceDiscussion = DiscussionMapper.toPersistence(discussion);
    const discussionId = discussion.getId().getValue();

    console.log(`MongoDiscussionRepository: Saving discussion with ID: ${discussionId}`);

    await DiscussionModel.findByIdAndUpdate(discussionId, persistenceDiscussion, { upsert: true });

    console.log(`MongoDiscussionRepository: Discussion ${discussionId} saved successfully.`);
  }
}
