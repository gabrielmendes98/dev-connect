import { NextFunction, Request, Response } from 'express';
import { RegisterUserUseCase } from '../../../../application/identity/use-cases/register-user/RegisterUserUseCase';
import {
  EmailPasswordLoginRequestSchema,
  RegisterUserRequestSchema,
} from '../../schemas/IdentitySchemas';
import { ApiResponse } from '../../responses/ApiResponse';
import { AuthenticateUserUseCase } from '../../../../application/identity/use-cases/authenticate-user/AuthenticateUserUseCase';
import { AuthWithEmailAndPasswordService } from '../../../../application/identity/services/auth-service/AuthWithEmailAndPasswordService';
import { UserRepository } from '../../../../domain/identity/repositories/UserRepository';
import { PasswordHasherService } from '../../../../domain/identity/services/PasswordHasherService';

export class IdentityController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordHasherService,
  ) {}

  public async registerUser(
    req: Request<{}, {}, RegisterUserRequestSchema>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await this.registerUserUseCase.execute({
        email: req.body.email,
        plainPassword: req.body.password,
      });

      ApiResponse.success(res, result, 201);

      return;
    } catch (error) {
      return next(error);
    }
  }

  public async login(
    req: Request<{}, {}, EmailPasswordLoginRequestSchema>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email, password } = req.body;
      const authWithEmailAndPasswordService = new AuthWithEmailAndPasswordService(
        this.userRepository,
        this.passwordService,
      );
      const result = await this.authenticateUserUseCase.execute({
        authService: authWithEmailAndPasswordService,
        credentials: {
          email,
          plainPassword: password,
        },
      });
      ApiResponse.success(res, result, 200);
      return;
    } catch (error) {
      next(error);
    }
  }
}
