import { Router } from 'express';
import { IdentityController } from '../controllers/identity/IdentityController';
import { createIdentityRoutes } from './IdentityRoutes.ts';

export const createPublicRoutes = (identityController: IdentityController): Router => {
  const router = Router();

  router.use('/identity', createIdentityRoutes(identityController, false));

  return router;
};
