import { v4 as uuidv4, validate as uuidValidate, version as uuidVersion } from 'uuid';
import { ValueObjectError } from './ValueObjectError';

export class IdVO {
  private constructor(private readonly value: string) {}

  public static create(): IdVO {
    const id = uuidv4();
    return new IdVO(id);
  }

  public static fromString(uuid: string): IdVO {
    if (!uuidValidate(uuid) || !(uuidVersion(uuid) === 4)) {
      throw new ValueObjectError(`Invalid UUID v4 format: "${uuid}"`);
    }

    return new IdVO(uuid);
  }

  public getValue() {
    return this.value;
  }

  public equals(other: IdVO) {
    return other instanceof IdVO && this.value === other.value;
  }
}
