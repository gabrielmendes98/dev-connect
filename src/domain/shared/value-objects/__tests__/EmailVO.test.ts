import { ValidationError } from '@domain/shared/errors/ValidationError';
import { EmailVO } from '../EmailVO';

describe('EmailVO', () => {
  it('should return error when create invalid email', () => {
    expect(() => EmailVO.create('invalid-email')).toThrow(ValidationError);
    expect(() => EmailVO.create('invalid-email')).toThrow('Email format is invalid.');
  });
});
