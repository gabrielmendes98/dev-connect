import { AggregateRoot } from '../../shared/core/AggregateRoot';
import { EntityError } from '../../shared/errors/EntityError';
import { IdVO } from '../../shared/value-objects/IdVO';
import { CommentEntity } from './CommentEntity';

export class DiscussionEntity extends AggregateRoot {
  private constructor(
    protected readonly id: IdVO,
    private title: string,
    private description: string,
    private imageUrl: string | null,
    private comments: CommentEntity[],
    private likeCount: number,
    private tagIds: IdVO[],
    private readonly createdByUserId: IdVO,
  ) {
    super(id);

    // Add more validations

    if (!title) {
      throw new EntityError('Discussion title must not be null');
    }

    if (!description) {
      throw new EntityError('Discussion description must not be null');
    }
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
    return new DiscussionEntity(id, title, description, imageUrl, [], 0, tagIds, userId);
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

  public getLikeCount(): number {
    return this.likeCount;
  }

  public getTags(): IdVO[] {
    return this.tagIds;
  }

  public wasCreatedBy(): IdVO {
    return this.createdByUserId;
  }
}
