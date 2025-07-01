import { Router } from 'express';
import { IdentityController } from '../controllers/identity/IdentityController';
import { validateRequest } from '../middlewares/ValidationMiddlewares';
import {
  emailPasswordLoginRequestSchema,
  registerUserRequestSchema,
} from '../schemas/IdentitySchemas';

export const createIdentityRoutes = (
  identityController: IdentityController,
  isPrivate: boolean,
): Router => {
  const router = Router();

  if (isPrivate) {
    router.get('/me', (req, res) => {
      res.json({ message: 'You are authenticated!', auth: req.auth });
    });
  } else {
    router.post(
      '/register',
      validateRequest(registerUserRequestSchema),
      identityController.registerUser.bind(identityController),
    );

    router.post(
      '/login',
      validateRequest(emailPasswordLoginRequestSchema),
      identityController.login.bind(identityController),
    );
  }

  return router;
};
