import { ProfileEntity } from '../../../../domain/identity/entities/ProfileEntity';
import { UserEntity } from '../../../../domain/identity/entities/UserEntity';
import { UserRepository } from '../../../../domain/identity/repositories/UserRepository';
import { PasswordHasherService } from '../../../../domain/identity/services/PasswordHasherService';
import { UnauthorizedError } from '../../../../domain/shared/errors/HttpErrors';
import { DomainHub } from '../../../../domain/shared/events/DomainHub';
import { PlainPasswordVO } from '../../../../domain/shared/value-objects/PlainPasswordVO';
import { AuthService } from './AuthService';

export interface AuthWithGoogleCredentials {
  email: string;
  name: string;
  avatarUrl?: string;
}

export class AuthWithGoogleService implements AuthService<AuthWithGoogleCredentials> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasherService: PasswordHasherService,
  ) {}

  public async authenticate(credentials: AuthWithGoogleCredentials): Promise<UserEntity> {
    const { email, name, avatarUrl } = credentials;

    if (!email) {
      throw new UnauthorizedError('Could not authenticate with Google: email not provided.');
    }

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      return existingUser;
    }

    console.log(`AuthWithGoogleService: User ${email} not found. Creating new user...`);

    // Se não existir, criamos um novo usuário e perfil.
    const newRandomPassword = PlainPasswordVO.generateRandomPassword();
    const newUser = await UserEntity.registerNewUser(
      email,
      newRandomPassword,
      this.passwordHasherService,
    );

    const newProfile = ProfileEntity.createInitialProfile(newUser.getId());
    newProfile.updateName(name);
    if (avatarUrl) {
      newProfile.updateAvatarUrl(avatarUrl);
    }

    await this.userRepository.createWithProfile(newUser, newProfile);

    DomainHub.dispatchEventsForAggregate(newUser.getId());

    return newUser;
  }
}
