import { DiscussionEntity } from '../../../domain/content/entities/DiscussionEntity';
import { DiscussionRepository } from '../../../domain/content/repositories/DiscussionRepository';

export class MongoDiscussionRepository implements DiscussionRepository {
  save(discussion: DiscussionEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
