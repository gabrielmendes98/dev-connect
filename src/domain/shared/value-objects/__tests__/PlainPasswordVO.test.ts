import { ValueObjectError } from '../../../shared/errors/ValueObjectError';
import { PlainPasswordVO } from '../PlainPasswordVO';

describe('PlainPasswordVO', () => {
  describe('create', () => {
    it('should create a valid password', () => {
      const password = 'validPassword123';
      const plainPassword = PlainPasswordVO.create(password);

      expect(plainPassword).toBeInstanceOf(PlainPasswordVO);
      expect(plainPassword.getValue()).toBe(password);
    });

    it('should throw error when password is empty', () => {
      expect(() => PlainPasswordVO.create('')).toThrow(ValueObjectError);
      expect(() => PlainPasswordVO.create('')).toThrow('Password cannot be empty.');
    });

    it('should throw error when password is null', () => {
      expect(() => PlainPasswordVO.create(null as unknown as string)).toThrow(ValueObjectError);
      expect(() => PlainPasswordVO.create(null as unknown as string)).toThrow(
        'Password cannot be empty.',
      );
    });

    it('should throw error when password is undefined', () => {
      expect(() => PlainPasswordVO.create(undefined as unknown as string)).toThrow(
        ValueObjectError,
      );
      expect(() => PlainPasswordVO.create(undefined as unknown as string)).toThrow(
        'Password cannot be empty.',
      );
    });

    it('should throw error when password is too short', () => {
      const shortPassword = '12345'; // 5 characters, minimum is 6
      expect(() => PlainPasswordVO.create(shortPassword)).toThrow(ValueObjectError);
      expect(() => PlainPasswordVO.create(shortPassword)).toThrow(
        `Password must be at least ${PlainPasswordVO.validationRules.PASSWORD_MIN_LENGTH} characters long.`,
      );
    });

    it('should accept password with exactly minimum length', () => {
      const minLengthPassword = '123456'; // 6 characters, exactly minimum
      const plainPassword = PlainPasswordVO.create(minLengthPassword);

      expect(plainPassword).toBeInstanceOf(PlainPasswordVO);
      expect(plainPassword.getValue()).toBe(minLengthPassword);
    });

    it('should accept password longer than minimum length', () => {
      const longPassword = 'veryLongPassword123!@#';
      const plainPassword = PlainPasswordVO.create(longPassword);

      expect(plainPassword).toBeInstanceOf(PlainPasswordVO);
      expect(plainPassword.getValue()).toBe(longPassword);
    });
  });

  describe('generateRandomPassword', () => {
    it('should generate a password with correct length', () => {
      const randomPassword = PlainPasswordVO.generateRandomPassword();

      expect(randomPassword).toHaveLength(10);
    });

    it('should generate different passwords on multiple calls', () => {
      const password1 = PlainPasswordVO.generateRandomPassword();
      const password2 = PlainPasswordVO.generateRandomPassword();
      const password3 = PlainPasswordVO.generateRandomPassword();

      expect(password1).not.toBe(password2);
      expect(password2).not.toBe(password3);
      expect(password1).not.toBe(password3);
    });

    it('should generate password with valid characters', () => {
      const validCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const randomPassword = PlainPasswordVO.generateRandomPassword();

      for (const char of randomPassword) {
        expect(validCharacters).toContain(char);
      }
    });

    it('should generate password that can be used to create PlainPasswordVO', () => {
      const randomPassword = PlainPasswordVO.generateRandomPassword();

      expect(() => PlainPasswordVO.create(randomPassword)).not.toThrow();
      const plainPassword = PlainPasswordVO.create(randomPassword);
      expect(plainPassword.getValue()).toBe(randomPassword);
    });
  });

  describe('getValue', () => {
    it('should return the password value', () => {
      const password = 'testPassword123';
      const plainPassword = PlainPasswordVO.create(password);

      expect(plainPassword.getValue()).toBe(password);
    });
  });

  describe('equals', () => {
    it('should return true for equal passwords', () => {
      const password1 = PlainPasswordVO.create('samePassword123');
      const password2 = PlainPasswordVO.create('samePassword123');

      expect(password1.equals(password2)).toBe(true);
    });

    it('should return false for different passwords', () => {
      const password1 = PlainPasswordVO.create('password123');
      const password2 = PlainPasswordVO.create('differentPassword123');

      expect(password1.equals(password2)).toBe(false);
    });

    it('should return false when comparing with non-PlainPasswordVO object', () => {
      const password = PlainPasswordVO.create('testPassword123');
      const nonPasswordObject = { value: 'testPassword123' };

      expect(password.equals(nonPasswordObject as unknown as PlainPasswordVO)).toBe(false);
    });

    it('should return false when comparing with null', () => {
      const password = PlainPasswordVO.create('testPassword123');

      expect(password.equals(null as unknown as PlainPasswordVO)).toBe(false);
    });

    it('should return false when comparing with undefined', () => {
      const password = PlainPasswordVO.create('testPassword123');

      expect(password.equals(undefined as unknown as PlainPasswordVO)).toBe(false);
    });
  });

  describe('validationRules', () => {
    it('should have correct minimum password length', () => {
      expect(PlainPasswordVO.validationRules.PASSWORD_MIN_LENGTH).toBe(6);
    });
  });
});
