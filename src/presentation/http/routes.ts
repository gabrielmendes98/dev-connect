import { Router } from 'express';
import { IdentityController } from './controllers/identity/IdentityController';
import { validateRequest } from './middlewares/ValidationMiddlewares';
import {
  emailPasswordLoginRequestSchema,
  registerUserRequestSchema,
} from './schemas/IdentitySchemas';

export const createIdentityRoutes = (identityController: IdentityController): Router => {
  const router = Router();

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

  return router;
};
