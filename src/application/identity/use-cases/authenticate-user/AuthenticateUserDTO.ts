import { AuthService } from '@application/identity/services/auth-service/AuthService';

export interface AuthenticateUserInput<T = unknown> {
  authService: AuthService<T>;
  credentials: T;
}

export type AuthenticateUserOutput = Promise<{
  token: string;
}>;
