import { ProfileEntity } from '../../../../domain/identity/entities/ProfileEntity';
import { UserEntity } from '../../../../domain/identity/entities/UserEntity';
import { UserRepository } from '../../../../domain/identity/repositories/UserRepository';
import { PasswordHasherService } from '../../../../domain/identity/services/PasswordHasherService';
import { ConflictError } from '../../../../domain/shared/errors/HttpErrors';
import { DomainHub } from '../../../../domain/shared/events/DomainHub';
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
      throw new ConflictError('Email already registered.');
    }

    const user = await UserEntity.registerNewUser(
      input.email,
      input.plainPassword,
      this.passwordHasherService,
    );

    const profile = ProfileEntity.createInitialProfile(user.getId());

    await this.userRepository.createWithProfile(user, profile);

    DomainHub.dispatchEventsForAggregate(user.getId());

    return void 0;
  }
}
