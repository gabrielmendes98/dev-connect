import { readFileSync } from 'fs';
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import { connectToMongoDB } from '@infrastructure/database/mongoose/MongooseConnectionService';
import container from '@presentation/config/DependencyContainer';
import { formatError } from '@presentation/graphql/config/FormatError';
import { httpStatusPlugin } from '@presentation/graphql/plugins/HttpStatusPlugin';
import { errorHandlerMiddleware } from '@presentation/http/middlewares/ErrorMiddlewares';
import { createPrivateRoutes } from '@presentation/http/routes/PrivateRoutes';
import { createPublicRoutes } from '@presentation/http/routes/PublicRoutes';

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  await connectToMongoDB();

  const identityController = container.resolve('identityController');
  const resolvers = container.resolve('resolvers');
  const graphqlContext = container.resolve('graphqlContext');
  const authMiddleware = container.resolve('authMiddleware');
  const logger = container.resolve('logger');

  process.on('uncaughtException', (error) => {
    logger.error(`UNCAUGHT EXCEPTION: ${error.message}`, { stack: error.stack });
    if (process.env.NODE_ENV !== 'development') {
      process.exit(1);
    }
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('UNHANDLED REJECTION: ', { promise, reason });
  });

  container.resolve('passportSetup');
  container.resolve('welcomeEmailListener');

  const typeDefs = readFileSync(
    path.join(__dirname, './presentation/graphql/schemas/DiscussionSchema.graphql'),
    'utf-8',
  );

  app.use(cors());
  app.use(express.json());
  app.use(passport.initialize());

  app.get('/health', (req, res) => {
    res.send('Hello from DevConnect!');
  });

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    formatError,
    plugins: [httpStatusPlugin],
    introspection: process.env.NODE_ENV !== 'production',
  });
  await apolloServer.start();

  // REST Routes
  const publicRoutes = createPublicRoutes(identityController);
  const privateRoutes = createPrivateRoutes(identityController);

  app.use('/api/v1', publicRoutes);
  app.use('/api/v1', authMiddleware, privateRoutes);

  // GraphQL Routes
  app.use(
    '/graphql',
    expressMiddleware(apolloServer, {
      context: graphqlContext,
    }),
  );

  app.use(errorHandlerMiddleware);

  app.listen(port, () => {
    logger.debug(`📡 Server is running on http://localhost:${port}`);
    logger.debug(`🚀 GraphQL Endpoint available in http://localhost:${port}/graphql`);
  });
}

startServer();
