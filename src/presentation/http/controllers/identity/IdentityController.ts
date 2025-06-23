import { NextFunction, Request, Response } from 'express';
import { RegisterUserUseCase } from '../../../../application/identity/use-cases/register-user/RegisterUserUseCase';
import { RegisterUserInput } from '../../../../application/identity/use-cases/register-user/RegisterUserDTO';

export class IdentityController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  public async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const input: RegisterUserInput = {
        email,
        plainPassword: password,
      };

      const result = await this.registerUserUseCase.execute(input);

      res.status(201).json(result);

      return;
    } catch (error) {
      return next(error);
    }
  }
}
