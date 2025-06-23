import { ProfileEntity } from '../entities/ProfileEntity';

export interface ProfileRepository {
  save(profile: ProfileEntity): Promise<void>;
}
