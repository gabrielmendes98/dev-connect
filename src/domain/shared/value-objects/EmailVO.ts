import { ValueObjectError } from '../errors/ValueObjectError';

export class EmailVO {
  private constructor(private readonly value: string) {}

  public static validationRules = {
    EMAIL_REGEX:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  };

  public static create(email: string): EmailVO {
    if (!email) {
      throw new ValueObjectError('Email cannot be empty.');
    }

    const isValid = EmailVO.validationRules.EMAIL_REGEX.test(email);

    if (!isValid) {
      throw new ValueObjectError('Email format is invalid.');
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
