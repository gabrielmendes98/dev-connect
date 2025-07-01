import { UserEntity } from '../../domain/identity/entities/UserEntity';
import { UserRepository } from '../../domain/identity/repositories/UserRepository';
import { AuthStrategy } from '../../domain/identity/services/AuthStrategy';
import { PasswordHasherService } from '../../domain/identity/services/PasswordHasherService';
import { UnauthorizedError } from '../../domain/shared/errors/HttpErrors';

interface Credentials {
  email: string;
  plainPassword: string;
}

export class EmailPasswordStrategy implements AuthStrategy<Credentials> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordHasherService,
  ) {}

  public async authenticate(credentials: Credentials): Promise<UserEntity> {
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
