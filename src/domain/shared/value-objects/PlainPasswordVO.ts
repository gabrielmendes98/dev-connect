import { ErrorNotification } from '../error-notification/ErrorNotification';

export class PlainPasswordVO {
  private constructor(private readonly value: string) {
    const errorNotification = new ErrorNotification('Password');

    if (!this.value) {
      errorNotification.addError('Password cannot be empty');
    }

    if (this.value.length < PlainPasswordVO.validationRules.PASSWORD_MIN_LENGTH) {
      errorNotification.addError(
        `Password must be at least ${PlainPasswordVO.validationRules.PASSWORD_MIN_LENGTH} characters long`,
      );
    }

    errorNotification.check();
  }

  public static validationRules = {
    PASSWORD_MIN_LENGTH: 6,
  };

  public static create(password: string): PlainPasswordVO {
    return new PlainPasswordVO(password);
  }

  public static generateRandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return new PlainPasswordVO(result);
  }

  public getValue() {
    return this.value;
  }

  public equals(other: PlainPasswordVO) {
    return other instanceof PlainPasswordVO && this.value === other.value;
  }
}
