import { UserEntity } from '@domain/identity/entities/UserEntity';
import { UserRepository } from '@domain/identity/repositories/UserRepository';
import { PasswordHasherService } from '@domain/identity/services/PasswordHasherService';
import { UnauthorizedError } from '@domain/shared/errors/HttpErrors';
import { AuthService } from './AuthService';

interface AuthWithEmailAndPasswordCredentials {
  email: string;
  plainPassword: string;
}

export class AuthWithEmailAndPasswordService
  implements AuthService<AuthWithEmailAndPasswordCredentials>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordHasherService,
  ) {}

  public async authenticate(credentials: AuthWithEmailAndPasswordCredentials): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user) {
      throw new UnauthorizedError('Invalid credentials.');
    }
    const passwordMatch = await this.passwordService.compare(
      credentials.plainPassword,
      user.getPasswordHash().getValue(),
    );
    if (!passwordMatch) {
      throw new UnauthorizedError('Invalid credentials.');
    }
    return user;
  }
}
