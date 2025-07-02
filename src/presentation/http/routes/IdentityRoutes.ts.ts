import { Router } from 'express';
import { IdentityController } from '../controllers/identity/IdentityController';
import { validateRequest } from '../middlewares/ValidationMiddlewares';
import {
  emailPasswordLoginRequestSchema,
  registerUserRequestSchema,
} from '../schemas/IdentitySchemas';
import passport from 'passport';

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

    router.get(
      '/auth/google',
      passport.authenticate('google', { scope: ['profile', 'email'], session: false }),
    );

    router.get(
      '/auth/google/callback',
      passport.authenticate('google', { failureRedirect: '/login-failed', session: false }),
      identityController.loginWithGoogle.bind(identityController),
    );
  }

  return router;
};
