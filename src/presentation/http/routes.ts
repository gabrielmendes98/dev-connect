import { Router } from 'express';
import { IdentityController } from './controllers/identity/IdentityController';
import { validateRequest } from './middlewares/ValidationMiddlewares';
import { registerUserRequestSchema } from './schemas/IdentitySchemas';

export const createIdentityRoutes = (identityController: IdentityController): Router => {
  const router = Router();

  router.post(
    '/register',
    validateRequest(registerUserRequestSchema),
    identityController.registerUser.bind(identityController),
  );

  return router;
};
