import { AuthStrategy } from '../../../../domain/identity/services/AuthStrategy';
import { TokenService } from '../../../../domain/identity/services/TokenService';
import { UseCase } from '../../../shared/UseCase';
import { AuthenticateUserInput, AuthenticateUserOutput } from './AuthenticateUserDTO';

export class AuthenticateUserUseCase<T>
  implements UseCase<AuthenticateUserInput<T>, AuthenticateUserOutput>
{
  constructor(
    private readonly authStrategy: AuthStrategy<T>,
    private readonly tokenService: TokenService,
  ) {}

  async execute(credentials: T): AuthenticateUserOutput {
    const user = await this.authStrategy.authenticate(credentials);
    const token = this.tokenService.generate({
      userId: user.getId().getValue(),
    });

    return {
      token,
    };
  }
}
