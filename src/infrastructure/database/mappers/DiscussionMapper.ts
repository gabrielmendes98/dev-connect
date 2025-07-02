import { DiscussionEntity } from '../../../domain/content/entities/DiscussionEntity';
import { IDiscussionBaseModel } from '../mongoose/models/DiscussionModel';

export class DiscussionMapper {
  public static toPersistence(entity: DiscussionEntity): IDiscussionBaseModel {
    return {
      _id: entity.getId().getValue(),
      title: entity.getTitle(),
      description: entity.getDescription(),
      imageUrl: entity.getImageUrl(),
      createdByUserId: entity.getCreatedByUserId().getValue(),
      tags: entity.getTagIds().map((tagId) => tagId.getValue()),
      comments: entity.getComments().map((comment) => ({
        _id: comment.getId().getValue(),
        authorId: comment.getAuthorId().getValue(),
        text: comment.getText(),
        createdAt: comment.getCreatedAt(),
      })),
    };
  }

  // Converte do Mongoose de volta para a nossa entidade de domínio
  public static toDomain(raw: IDiscussionBaseModel): DiscussionEntity {
    return DiscussionEntity.fromPersistenceWithoutLoadingComments(
      raw._id,
      raw.title,
      raw.description,
      raw.imageUrl,
      raw.tags,
      raw.createdByUserId,
    );
  }
}
