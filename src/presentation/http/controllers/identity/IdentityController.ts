import { NextFunction, Request, Response } from 'express';
import { RegisterUserUseCase } from '../../../../application/identity/use-cases/register-user/RegisterUserUseCase';
import { RegisterUserRequestSchema } from '../../schemas/IdentitySchemas';
import { ApiResponse } from '../../responses/ApiResponse';

export class IdentityController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

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
}
