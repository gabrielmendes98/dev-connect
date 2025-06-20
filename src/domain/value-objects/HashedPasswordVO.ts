import { PasswordHasherService } from '../services/PasswordHasherService';
import { ValueObjectError } from './ValueObjectError';

export class HashedPasswordVO {
  private readonly value: string;
  private constructor(value: string) {
    if (!value) {
      throw new ValueObjectError('Hashed password must not be empty.');
    }

    this.value = value;
  }

  public static fromString(hash: string): HashedPasswordVO {
    return new HashedPasswordVO(hash);
  }

  public getValue() {
    return this.value;
  }

  public async compare(plainPassword: string, hasher: PasswordHasherService): Promise<boolean> {
    return hasher.compare(plainPassword, this.value);
  }

  public equals(other: HashedPasswordVO) {
    return other instanceof HashedPasswordVO && this.value === other.value;
  }
}
