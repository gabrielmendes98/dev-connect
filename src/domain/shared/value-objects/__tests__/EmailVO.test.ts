import { ValueObjectError } from '../../../shared/errors/ValueObjectError';
import { EmailVO } from '../EmailVO';

describe('EmailVO', () => {
  it('should return error when create invalid email', () => {
    expect(() => EmailVO.create('invalid-email')).toThrow(ValueObjectError);
  });
});
