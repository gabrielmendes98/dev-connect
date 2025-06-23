import { IdVO } from '../value-objects/IdVO';

export abstract class Entity {
  protected readonly id: IdVO;

  constructor(id?: IdVO) {
    this.id = id ? id : IdVO.create();
  }

  public getId(): IdVO {
    return this.id;
  }

  public equals(other?: Entity): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (this === other) {
      return true;
    }

    if (!(other instanceof Entity)) {
      return false;
    }

    return this.id.equals(other.id);
  }
}
