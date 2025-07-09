import { DiscussionEntity } from '@domain/content/entities/DiscussionEntity';
import { DiscussionRepository } from '@domain/content/repositories/DiscussionRepository';
import {
  CursorPaginationInputDTO,
  CursorPaginationOutputDTO,
} from '@domain/shared/dtos/PaginationDTO';
import { InternalServerError } from '@domain/shared/errors/HttpErrors';
import { Logger } from '@application/shared/ports/Logger';
import { DiscussionMapper } from '../mappers/DiscussionMapper';
import { DiscussionModel } from '../mongoose/models/DiscussionModel';

export class MongoDiscussionRepository implements DiscussionRepository {
  constructor(private readonly logger: Logger) {}

  async save(discussion: DiscussionEntity): Promise<void> {
    try {
      const persistenceDiscussion = DiscussionMapper.toPersistence(discussion);
      const discussionId = discussion.getId().getValue();

      this.logger.info(`MongoDiscussionRepository: Saving discussion with ID: ${discussionId}`);

      await DiscussionModel.findByIdAndUpdate(discussionId, persistenceDiscussion, {
        upsert: true,
      });

      this.logger.info(`MongoDiscussionRepository: Discussion ${discussionId} saved successfully.`);
    } catch (error) {
      this.logger.error('MongoDiscussionRepository: Error saving discussion', { error });
      throw new InternalServerError('Unexpected server error when saving discussion');
    }
  }

  async findAll({
    limit,
    after,
  }: CursorPaginationInputDTO): Promise<CursorPaginationOutputDTO<DiscussionEntity>> {
    try {
      const query: Record<string, unknown> = {};

      if (after) {
        const decodedCursor = Buffer.from(after, 'base64').toString('utf-8');
        const timestamp = new Date(decodedCursor);
        query.createdAt = { $lt: timestamp };
      }

      const discussions = await DiscussionModel.find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .exec();

      const formattedDiscussions = discussions.map((discussion) =>
        DiscussionMapper.toDomain(discussion),
      );

      return {
        items: formattedDiscussions,
        nextCursor:
          formattedDiscussions.length === limit
            ? Buffer.from(formattedDiscussions[limit - 1].getCreatedAt().toISOString()).toString(
                'base64',
              )
            : undefined,
      };
    } catch (error) {
      this.logger.error('MongoDiscussionRepository: Error finding discussions', { error });
      throw new InternalServerError('Unexpected server error when finding discussions');
    }
  }
}
