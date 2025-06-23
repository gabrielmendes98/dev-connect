import { ProfileEntity } from '../entities/ProfileEntity';
import { UserEntity } from '../entities/UserEntity';

export interface UserRepository {
  save(user: UserEntity): Promise<void>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  createWithProfile(user: UserEntity, profile: ProfileEntity): Promise<void>;
}
