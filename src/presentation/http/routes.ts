import { Router } from 'express';
import { IdentityController } from './controllers/identity/IdentityController';

export const createIdentityRoutes = (identityController: IdentityController): Router => {
  const router = Router();

  router.post('/register', identityController.registerUser.bind(identityController));

  return router;
};
