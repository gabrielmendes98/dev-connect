import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '@domain/identity/repositories/UserRepository';
import { PasswordHasherService } from '@domain/identity/services/PasswordHasherService';
import { AuthWithEmailAndPasswordService } from '@application/identity/services/auth-service/AuthWithEmailAndPasswordService';
import {
  AuthWithGoogleCredentials,
  AuthWithGoogleService,
} from '@application/identity/services/auth-service/AuthWithGoogleService';
import { AuthenticateUserUseCase } from '@application/identity/use-cases/authenticate-user/AuthenticateUserUseCase';
import { RegisterUserUseCase } from '@application/identity/use-cases/register-user/RegisterUserUseCase';
import { Logger } from '@application/shared/ports/Logger';
import { ApiResponse } from '@presentation/http/responses/ApiResponse';
import {
  EmailPasswordLoginRequestSchema,
  RegisterUserRequestSchema,
} from '@presentation/http/schemas/IdentitySchemas';

export class IdentityController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
    private readonly userRepository: UserRepository,
    private readonly passwordHasherService: PasswordHasherService,
    private readonly logger: Logger,
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
        this.passwordHasherService,
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

  public async loginWithGoogle(req: Request, res: Response, next: NextFunction) {
    try {
      // 'req.user' now contains the GoogleProfileData object that we passed in the 'done()'.
      const googleProfile = req.user as AuthWithGoogleCredentials;

      const authWithGoogleService = new AuthWithGoogleService(
        this.userRepository,
        this.passwordHasherService,
        this.logger,
      );

      const { token } = await this.authenticateUserUseCase.execute({
        authService: authWithGoogleService,
        credentials: googleProfile,
      });

      res.redirect(`${process.env.WEB_APP_URL}?token=${token}`);
    } catch (error) {
      next(error);
    }
  }
}
