import { User as PrismaUser } from '@prisma/client';
import { UserEntity } from '@domain/identity/entities/UserEntity';

export class UserMapper {
  public static toPersistence(entity: UserEntity): Omit<PrismaUser, 'createdAt' | 'updatedAt'> {
    return {
      id: entity.getId().getValue(),
      email: entity.getEmail().getValue(),
      passwordHash: entity.getPasswordHash().getValue(),
    };
  }

  public static toDomain(prismaUser: PrismaUser): UserEntity {
    return UserEntity.fromPersistence(
      prismaUser.id,
      prismaUser.email,
      prismaUser.passwordHash,
      prismaUser.createdAt,
      prismaUser.updatedAt,
    );
  }
}
