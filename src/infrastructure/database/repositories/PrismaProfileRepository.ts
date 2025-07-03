import { PrismaClient } from '@prisma/client';
import { ProfileEntity } from '@domain/identity/entities/ProfileEntity';
import { ProfileRepository } from '@domain/identity/repositories/ProfileRepository';
import { ProfileMapper } from '../mappers/ProfileMapper';

export class PrismaProfileRepository implements ProfileRepository {
  constructor(private readonly client: PrismaClient) {}

  async save(profile: ProfileEntity): Promise<void> {
    const profileModel = ProfileMapper.toPersistence(profile);

    await this.client.profile.update({
      where: {
        id: profileModel.id,
      },
      data: profileModel,
    });

    return void 0;
  }
}
