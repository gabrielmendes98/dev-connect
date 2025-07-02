import { TokenService } from '../../../../domain/identity/services/TokenService';
import { UseCase } from '../../../shared/UseCase';
import { AuthenticateUserInput, AuthenticateUserOutput } from './AuthenticateUserDTO';

export class AuthenticateUserUseCase
  implements UseCase<AuthenticateUserInput, AuthenticateUserOutput>
{
  constructor(private readonly tokenService: TokenService) {}

  async execute<T>({ authService, credentials }: AuthenticateUserInput<T>): AuthenticateUserOutput {
    const user = await authService.authenticate(credentials);
    const token = this.tokenService.generate({
      userId: user.getId().getValue(),
    });

    return {
      token,
    };
  }
}
