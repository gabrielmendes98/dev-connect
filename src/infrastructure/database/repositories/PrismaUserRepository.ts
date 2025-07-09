import { PrismaClient } from '@prisma/client';
import { ProfileEntity } from '@domain/identity/entities/ProfileEntity';
import { UserEntity } from '@domain/identity/entities/UserEntity';
import { UserRepository } from '@domain/identity/repositories/UserRepository';
import { Logger } from '@application/shared/ports/Logger';
import { ProfileMapper } from '../mappers/ProfileMapper';
import { UserMapper } from '../mappers/UserMapper';

export class PrismaUserRepository implements UserRepository {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly logger: Logger,
  ) {}

  async createWithProfile(user: UserEntity, profile: ProfileEntity): Promise<void> {
    try {
      const userModel = UserMapper.toPersistence(user);

      await this.prismaClient.$transaction(async (tx) => {
        await tx.user.create({
          data: userModel,
        });
      });

      const profileModel = ProfileMapper.toPersistence(profile);

      await this.prismaClient.$transaction(async (tx) => {
        await tx.profile.create({
          data: profileModel,
        });
      });
    } catch (error) {
      this.logger.error('Error creating user and profile in transaction:', { error });
      throw error;
    } finally {
      await this.prismaClient.$disconnect();
    }
  }

  async save(user: UserEntity): Promise<void> {
    const userModel = UserMapper.toPersistence(user);

    await this.prismaClient.user.update({
      where: {
        id: userModel.id,
      },
      data: userModel,
    });

    return void 0;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prismaClient.user.findUnique({
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
    const user = await this.prismaClient.user.findUnique({
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
