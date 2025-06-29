import { DiscussionEntity } from '../entities/DiscussionEntity';

export interface DiscussionRepository {
  save(discussion: DiscussionEntity): Promise<void>;
}
