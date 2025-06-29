import { Entity } from '../../shared/core/Entity';
import { EntityError } from '../../shared/errors/EntityError';
import { IdVO } from '../../shared/value-objects/IdVO';

export class TagEntity extends Entity {
  private constructor(
    protected readonly id: IdVO,
    private readonly name: string,
  ) {
    super(id);
    if (!name) {
      throw new EntityError('Tag name must not be empty');
    }
  }

  public static createNewTag(tagName: string) {
    const id = IdVO.create();
    return new TagEntity(id, tagName);
  }

  public getName() {
    return this.name;
  }
}
