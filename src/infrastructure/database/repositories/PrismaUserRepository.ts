import { ProfileEntity } from '../../../domain/identity/entities/ProfileEntity';
import { UserEntity } from '../../../domain/identity/entities/UserEntity';
import { UserRepository } from '../../../domain/identity/repositories/UserRepository';
import { ProfileMapper } from '../mappers/ProfileMapper';
import { UserMapper } from '../mappers/UserMapper';
import { PrismaClient } from '@prisma/client';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly client: PrismaClient) {}

  async createWithProfile(user: UserEntity, profile: ProfileEntity): Promise<void> {
    const userModel = UserMapper.toPersistence(user);
    const profileModel = ProfileMapper.toPersistence(profile);

    await this.client.user.create({
      data: {
        ...userModel,
        profile: {
          create: profileModel,
        },
      },
    });
  }

  async save(user: UserEntity): Promise<void> {
    const userModel = UserMapper.toPersistence(user);

    await this.client.user.update({
      where: {
        id: userModel.id,
      },
      data: userModel,
    });

    return void 0;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.client.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.client.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }
}
