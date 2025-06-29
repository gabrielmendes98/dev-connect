import { Entity } from '../../shared/core/Entity';
import { IdVO } from '../../shared/value-objects/IdVO';

export class CommentEntity extends Entity {
  constructor(protected readonly id: IdVO) {
    super(id);
  }
}
