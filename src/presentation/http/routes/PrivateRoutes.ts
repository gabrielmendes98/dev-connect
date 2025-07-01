import { Router } from 'express';
import { IdentityController } from '../controllers/identity/IdentityController';
import { createIdentityRoutes } from './IdentityRoutes.ts';

export const createPrivateRoutes = (identityController: IdentityController): Router => {
  const router = Router();

  router.use('/identity', createIdentityRoutes(identityController, true));

  return router;
};
