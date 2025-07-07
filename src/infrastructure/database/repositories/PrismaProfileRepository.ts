import { PrismaClient } from '@prisma/client';
import { ProfileEntity } from '@domain/identity/entities/ProfileEntity';
import { ProfileRepository } from '@domain/identity/repositories/ProfileRepository';
import { ProfileMapper } from '../mappers/ProfileMapper';

export class PrismaProfileRepository implements ProfileRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async save(profile: ProfileEntity): Promise<void> {
    const profileModel = ProfileMapper.toPersistence(profile);

    await this.prismaClient.profile.update({
      where: {
        id: profileModel.id,
      },
      data: profileModel,
    });

    return void 0;
  }
}
