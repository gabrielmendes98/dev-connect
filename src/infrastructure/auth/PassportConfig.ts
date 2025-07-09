import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { UnauthorizedError } from '@domain/shared/errors/HttpErrors';
import { AuthWithGoogleCredentials } from '@application/identity/services/auth-service/AuthWithGoogleService';
import { Logger } from '@application/shared/ports/Logger';

export const setupPassport = ({ logger }: { logger: Logger }) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      },
      async (accessToken, refreshToken, profile: Profile, done) => {
        logger.info('PassportConfig: Profile received from Google.');

        const email = profile.emails?.[0].value;

        if (!email) {
          const error = new UnauthorizedError(
            'Could not get email from Google. Permission may have been denied.',
          );
          return done(error, false);
        }

        const googleProfile: AuthWithGoogleCredentials = {
          email: email,
          name: profile.displayName,
          avatarUrl: profile.photos?.[0].value,
        };

        return done(null, googleProfile);
      },
    ),
  );
};
