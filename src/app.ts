import { readFileSync } from 'fs';
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import { CreateDiscussionUseCase } from '@application/content/use-cases/create-discussion/CreateDiscussionUseCase';
import { MongoDiscussionRepository } from '@infrastructure/database/repositories/MongoDiscussionRepository';
import { MongoTagRepository } from '@infrastructure/database/repositories/MongoTagRepository';
import { createGraphQLContext } from '@presentation/graphql/context';
import { buildResolvers } from '@presentation/graphql/resolvers';
import { WelcomeEmailListener } from './application/event-listeners/WelcomeEmailListener';
import { AuthenticateUserUseCase } from './application/identity/use-cases/authenticate-user/AuthenticateUserUseCase';
import { RegisterUserUseCase } from './application/identity/use-cases/register-user/RegisterUserUseCase';
import { setupPassport } from './infrastructure/auth/PassportConfig';
import { connectToMongoDB } from './infrastructure/database/mongoose/MongooseConnectionService';
import { prisma } from './infrastructure/database/prisma/PrismaClientService';
import { PrismaUserRepository } from './infrastructure/database/repositories/PrismaUserRepository';
import { BcryptPasswordHasher } from './infrastructure/service-adapters/BcryptPasswordHasher';
import { JwtTokenService } from './infrastructure/service-adapters/JwtTokenService';
import { IdentityController } from './presentation/http/controllers/identity/IdentityController';
import { authMiddleware } from './presentation/http/middlewares/AuthMiddleware';
import { errorHandlerMiddleware } from './presentation/http/middlewares/ErrorMiddlewares';
import { createPrivateRoutes } from './presentation/http/routes/PrivateRoutes';
import { createPublicRoutes } from './presentation/http/routes/PublicRoutes';

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  await connectToMongoDB();
  const typeDefs = readFileSync(
    path.join(__dirname, './presentation/graphql/schemas/DiscussionSchema.graphql'),
    'utf-8',
  );

  app.use(cors());
  app.use(express.json());

  app.get('/health', (req, res) => {
    res.send('Hello from DevConnect!');
  });

  // Event Listeners
  new WelcomeEmailListener();

  // TODO: Refactor Dependency Injection

  // Dependencies
  const userRepository = new PrismaUserRepository(prisma);
  const passwordHasherService = new BcryptPasswordHasher();
  const registerUserUseCase = new RegisterUserUseCase(userRepository, passwordHasherService);
  const tokenService = new JwtTokenService();
  const authenticateUserUseCase = new AuthenticateUserUseCase(tokenService);
  const discussionRepository = new MongoDiscussionRepository();
  const createDiscussionUseCase = new CreateDiscussionUseCase(discussionRepository);
  const tagRepository = new MongoTagRepository();

  // Controllers
  const identityController = new IdentityController(
    registerUserUseCase,
    authenticateUserUseCase,
    userRepository,
    passwordHasherService,
  );

  // Configs
  setupPassport();
  app.use(passport.initialize());

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: buildResolvers({
      createDiscussionUseCase,
      tagRepository,
    }),
  });
  await apolloServer.start();

  // Routes
  const publicRoutes = createPublicRoutes(identityController);
  const privateRoutes = createPrivateRoutes(identityController);

  app.use('/api/v1', publicRoutes);
  app.use('/api/v1', authMiddleware, privateRoutes);

  app.use(
    '/graphql',
    expressMiddleware(apolloServer, {
      context: createGraphQLContext(tokenService),
    }),
  );

  // Middlewares
  app.use(errorHandlerMiddleware);

  app.listen(port, () => {
    console.log(`📡 Server is running on http://localhost:${port}`);
    console.log(`🚀 GraphQL Endpoint available in http://localhost:${port}/graphql`);
  });
}

startServer();
