import { ValueObjectError } from '../errors/ValueObjectError';

export class PlainPasswordVO {
  private constructor(private readonly value: string) {}

  public static validationRules = {
    PASSWORD_MIN_LENGTH: 6,
  };

  public static create(password: string): PlainPasswordVO {
    if (!password) {
      throw new ValueObjectError('Password cannot be empty.');
    }

    if (password.length < PlainPasswordVO.validationRules.PASSWORD_MIN_LENGTH) {
      throw new ValueObjectError(
        `Password must be at least ${PlainPasswordVO.validationRules.PASSWORD_MIN_LENGTH} characters long.`,
      );
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
