import { ValueObjectError } from '../errors/ValueObjectError';

export class PlainPasswordVO {
  private constructor(private readonly value: string) {}

  public static create(password: string): PlainPasswordVO {
    if (!password) {
      throw new ValueObjectError('Password cannot be empty.');
    }

    if (password.length < 6) {
      throw new ValueObjectError('Password must be at least 6 characters long.');
    }

    return new PlainPasswordVO(password);
  }

  public getValue() {
    return this.value;
  }

  public equals(other: PlainPasswordVO) {
    return other instanceof PlainPasswordVO && this.value === other.value;
  }
}
