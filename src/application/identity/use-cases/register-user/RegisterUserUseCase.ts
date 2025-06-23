import { ProfileEntity } from '../../../../domain/identity/entities/ProfileEntity';
import { UserEntity } from '../../../../domain/identity/entities/UserEntity';
import { ProfileRepository } from '../../../../domain/identity/repositories/ProfileRepository';
import { UserRepository } from '../../../../domain/identity/repositories/UserRepository';
import { PasswordHasherService } from '../../../../domain/identity/services/PasswordHasherService';
import { DomainError } from '../../../../domain/shared/errors/DomainError';
import { UseCase } from '../../../shared/UseCase';
import { RegisterUserInput, RegisterUserOutput } from './RegisterUserDTO';

export class RegisterUserUseCase implements UseCase<RegisterUserInput, RegisterUserOutput> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasherService: PasswordHasherService,
  ) {}

  public async execute(input: RegisterUserInput): RegisterUserOutput {
    const userAlreadyExists = await this.userRepository.findByEmail(input.email);
    if (userAlreadyExists) {
      throw new DomainError('Email already registered.');
    }

    const user = await UserEntity.registerNewUser(
      input.email,
      input.plainPassword,
      this.passwordHasherService,
    );

    const profile = await ProfileEntity.createInitialProfile(user.getId());

    await this.userRepository.createWithProfile(user, profile);

    // TODO: Dispatch user created event

    return void 0;
  }
}
