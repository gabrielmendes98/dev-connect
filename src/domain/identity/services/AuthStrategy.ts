import { UserEntity } from '../entities/UserEntity';

export interface AuthStrategy<T> {
  authenticate(credentials: T): Promise<UserEntity>;
}
