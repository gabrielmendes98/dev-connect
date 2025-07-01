import { Entity } from '../../shared/core/Entity';
import { EntityError } from '../../shared/errors/EntityError';
import { IdVO } from '../../shared/value-objects/IdVO';

export class CommentEntity extends Entity {
  private constructor(
    protected readonly id: IdVO,
    private readonly authorId: IdVO,
    private text: string,
    private createdAt: Date,
  ) {
    super(id);
    if (!text) {
      throw new EntityError('Comment text must not be empty.');
    }
  }

  public static addComment(authorIdString: string, text: string) {
    const id = IdVO.create();
    const authorId = IdVO.fromString(authorIdString);
    return new CommentEntity(id, authorId, text, new Date());
  }

  public static fromPersistence(
    idString: string,
    authorIdString: string,
    text: string,
    createdAt: Date,
  ) {
    const id = IdVO.fromString(idString);
    const authorId = IdVO.fromString(authorIdString);
    return new CommentEntity(id, authorId, text, createdAt);
  }

  public getAuthorId() {
    return this.authorId;
  }

  public getText() {
    return this.text;
  }

  public getCreatedAt() {
    return this.createdAt;
  }
}
