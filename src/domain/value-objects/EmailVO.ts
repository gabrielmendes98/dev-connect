import { ValueObjectError } from './ValueObjectError';

export class EmailVO {
  private constructor(private readonly value: string) {}

  public static create(email: string): EmailVO {
    if (!email) {
      throw new ValueObjectError('Email cannot be empty.');
    }

    // More fake validations

    return new EmailVO(email);
  }

  public getValue() {
    return this.value;
  }

  public equals(other: EmailVO) {
    return other instanceof EmailVO && this.value === other.value;
  }
}
