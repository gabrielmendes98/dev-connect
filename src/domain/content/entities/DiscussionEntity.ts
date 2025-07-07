import { ErrorNotification } from '@domain/shared/error-notification/ErrorNotification';
import { AggregateRoot } from '../../shared/core/AggregateRoot';
import { EntityError } from '../../shared/errors/EntityError';
import { IdVO } from '../../shared/value-objects/IdVO';
import { DiscussionCommentAddedEvent } from '../events/DiscussionCommentAddedEvent';
import { CommentEntity } from './CommentEntity';

export class DiscussionEntity extends AggregateRoot {
  private constructor(
    protected readonly id: IdVO,
    private title: string,
    private description: string,
    private imageUrl: string | null,
    private comments: CommentEntity[],
    private tagIds: IdVO[],
    private readonly createdByUserId: IdVO,
  ) {
    super(id);

    // Add more validations
    const errorNotification = new ErrorNotification('Discussion');

    if (!title) {
      errorNotification.addError('Discussion title must not be null');
    }

    if (!description) {
      errorNotification.addError('Discussion description must not be null');
    }

    errorNotification.check();
  }

  public static createNewDiscussion(
    title: string,
    description: string,
    imageUrl: string | null,
    tagIdStrings: string[],
    createdByUserId: string,
  ) {
    const id = IdVO.create();
    const userId = IdVO.fromString(createdByUserId);
    const tagIds = tagIdStrings.map((id) => IdVO.fromString(id));
    return new DiscussionEntity(id, title, description, imageUrl, [], tagIds, userId);
  }

  public static fromPersistenceWithoutLoadingComments(
    idString: string,
    title: string,
    description: string,
    imageUrl: string | null,
    tagIdStrings: string[],
    createdByUserId: string,
  ) {
    const id = IdVO.fromString(idString);
    const userId = IdVO.fromString(createdByUserId);
    const tagIds = tagIdStrings.map((id) => IdVO.fromString(id));
    return new DiscussionEntity(id, title, description, imageUrl, [], tagIds, userId);
  }

  public addComment(authorId: string, text: string) {
    const newComment = CommentEntity.addComment(authorId, text);
    this.comments.push(newComment);
    this.addDomainEvent(new DiscussionCommentAddedEvent(this.id, IdVO.fromString(authorId), text));
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getImageUrl(): string | null {
    return this.imageUrl;
  }

  public getComments(): CommentEntity[] {
    return this.comments;
  }

  public getTagIds(): IdVO[] {
    return this.tagIds;
  }

  public getCreatedByUserId(): IdVO {
    return this.createdByUserId;
  }
}
