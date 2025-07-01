import { NextFunction, Request, Response } from 'express';
import { RegisterUserUseCase } from '../../../../application/identity/use-cases/register-user/RegisterUserUseCase';
import {
  EmailPasswordLoginRequestSchema,
  RegisterUserRequestSchema,
} from '../../schemas/IdentitySchemas';
import { ApiResponse } from '../../responses/ApiResponse';
import { AuthenticateUserUseCase } from '../../../../application/identity/use-cases/authenticate-user/AuthenticateUserUseCase';

export class IdentityController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    // TODO: Type here
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly authenticateUserUseCase: AuthenticateUserUseCase<any>,
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
      const result = await this.authenticateUserUseCase.execute({
        email,
        password,
      });
      ApiResponse.success(res, result, 200);
      return;
    } catch (error) {
      next(error);
    }
  }
}
