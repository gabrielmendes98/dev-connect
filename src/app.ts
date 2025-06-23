import express from 'express';
import { createIdentityRoutes } from './presentation/http/routes';
import { IdentityController } from './presentation/http/controllers/identity/IdentityController';
import { RegisterUserUseCase } from './application/identity/use-cases/register-user/RegisterUserUseCase';
import { PrismaUserRepository } from './infrastructure/database/repositories/PrismaUserRepository';
import { BcryptPasswordHasher } from './infrastructure/service-adapters/BcryptPasswordHasher';
import { prisma } from './infrastructure/database/prisma/PrismaClientService';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get('/health', (req, res) => {
  res.send('Hello from DevConnect!');
});

const userRepository = new PrismaUserRepository(prisma);
const passwordHasherService = new BcryptPasswordHasher();

const registerUserUseCase = new RegisterUserUseCase(userRepository, passwordHasherService);

const identityController = new IdentityController(registerUserUseCase);

const identityRoutes = createIdentityRoutes(identityController);

app.use('/api/v1/identity', identityRoutes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${port}`);
});
