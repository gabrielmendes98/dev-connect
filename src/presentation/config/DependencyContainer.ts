import { asClass, asFunction, asValue, createContainer, InjectionMode } from 'awilix';
import { CreateDiscussionUseCase } from '@application/content/use-cases/create-discussion/CreateDiscussionUseCase';
import { ListDiscussionFeedUseCase } from '@application/content/use-cases/list-discussion-feed/ListDiscussionFeedUseCase';
import { WelcomeEmailListener } from '@application/event-listeners/WelcomeEmailListener';
import { AuthenticateUserUseCase } from '@application/identity/use-cases/authenticate-user/AuthenticateUserUseCase';
import { RegisterUserUseCase } from '@application/identity/use-cases/register-user/RegisterUserUseCase';
import { WinstonLogger } from '@infrastructure/adapters/WinstonLogger';
import { setupPassport } from '@infrastructure/auth/PassportConfig';
import { prisma } from '@infrastructure/database/prisma/PrismaClientService';
import { MongoDiscussionRepository } from '@infrastructure/database/repositories/MongoDiscussionRepository';
import { MongoTagRepository } from '@infrastructure/database/repositories/MongoTagRepository';
import { PrismaUserRepository } from '@infrastructure/database/repositories/PrismaUserRepository';
import { BcryptPasswordHasher } from '@infrastructure/service-adapters/BcryptPasswordHasher';
import { JwtTokenService } from '@infrastructure/service-adapters/JwtTokenService';
import { createGraphQLContext } from '@presentation/graphql/context';
import { buildResolvers } from '@presentation/graphql/resolvers';
import { IdentityController } from '@presentation/http/controllers/identity/IdentityController';
import { buildAuthMiddleware } from '@presentation/http/middlewares/AuthMiddleware';
import { buildErrorHandlerMiddleware } from '@presentation/http/middlewares/ErrorMiddlewares';

const container = createContainer({
  strict: true,
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  // --- Values and Ready Instances ---
  prismaClient: asValue(prisma),
  logger: asClass(WinstonLogger).singleton(),

  // --- Infrastructure Services (Singletons) ---
  userRepository: asClass(PrismaUserRepository).singleton(),
  discussionRepository: asClass(MongoDiscussionRepository).singleton(),
  tagRepository: asClass(MongoTagRepository).singleton(),
  passwordHasherService: asClass(BcryptPasswordHasher).singleton(),
  tokenService: asClass(JwtTokenService).singleton(),

  // --- Application Use Cases (Scoped or Transient) ---
  registerUserUseCase: asClass(RegisterUserUseCase).singleton(),
  authenticateUserUseCase: asClass(AuthenticateUserUseCase).singleton(),
  createDiscussionUseCase: asClass(CreateDiscussionUseCase).singleton(),
  listDiscussionFeedUseCase: asClass(ListDiscussionFeedUseCase).singleton(),

  // --- Presentation Layer ---
  identityController: asClass(IdentityController).singleton(),

  // --- Builders ---
  resolvers: asFunction(buildResolvers).singleton().proxy(),
  graphqlContext: asFunction(createGraphQLContext).singleton().proxy(),
  authMiddleware: asFunction(buildAuthMiddleware).singleton().proxy(),
  errorHandlerMiddleware: asFunction(buildErrorHandlerMiddleware).singleton().proxy(),

  // --- Other setups ---
  passportSetup: asFunction(setupPassport).singleton().proxy(),
  welcomeEmailListener: asClass(WelcomeEmailListener).singleton(),
});

export type AppContainer = typeof container;

export default container;
