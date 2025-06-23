import express from 'express';
import { createIdentityRoutes } from './presentation/http/routes';
import { IdentityController } from './presentation/http/controllers/identity/IdentityController';
import { RegisterUserUseCase } from './application/identity/use-cases/register-user/RegisterUserUseCase';
import { PrismaUserRepository } from './infrastructure/database/repositories/PrismaUserRepository';
import { BcryptPasswordHasher } from './infrastructure/service-adapters/BcryptPasswordHasher';
import { prisma } from './infrastructure/database/prisma/PrismaClientService';
import { errorHandlerMiddleware } from './presentation/http/middlewares/ErrorMiddlewares';
import { WelcomeEmailListener } from './application/event-listeners/WelcomeEmailListener';

const app = express();
const port = process.env.PORT || 3000;
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

// Controllers
const identityController = new IdentityController(registerUserUseCase);

// Routes
const identityRoutes = createIdentityRoutes(identityController);
app.use('/api/v1/identity', identityRoutes);

// Middlewares
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
