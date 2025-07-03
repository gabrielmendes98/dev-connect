import { UserEntity } from '@domain/identity/entities/UserEntity';

export interface AuthService<T> {
  authenticate(credentials: T): Promise<UserEntity>;
}
