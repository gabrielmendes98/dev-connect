import * as bcrypt from 'bcryptjs';
import { PasswordHasherService } from '../../domain/identity/services/PasswordHasherService';

export class BcryptPasswordHasher implements PasswordHasherService {
  private readonly saltRounds: number;

  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds;
  }

  public async hash(plainPassword: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds);
      const hash = await bcrypt.hash(plainPassword, salt);
      return hash;
    } catch (error) {
      console.error('Error during password hashing:', error); // TODO: Change for logger
      throw new Error('Failed to hash password.');
    }
  }

  public async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      console.error('Error during password comparison:', error); // TODO: Change for logger
      return false;
    }
  }
}
