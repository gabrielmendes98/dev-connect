import { Profile as PrismaProfile } from '@prisma/client';
import { ProfileEntity } from '../../../domain/identity/entities/ProfileEntity';

export class ProfileMapper {
  public static toPersistence(
    entity: ProfileEntity,
  ): Omit<PrismaProfile, 'createdAt' | 'updatedAt'> {
    return {
      id: entity.getId().getValue(),
      userId: entity.getUserId().getValue(),
      name: entity.getName(),
      username: entity.getUsername(),
      bio: entity.getBio(),
      role: entity.getRole(),
      avatarUrl: entity.getAvatarUrl(),
    };
  }

  public static toDomain(prismaProfile: PrismaProfile): ProfileEntity {
    return ProfileEntity.fromPersistence(
      prismaProfile.id,
      prismaProfile.userId,
      prismaProfile.name,
      prismaProfile.username,
      prismaProfile.bio,
      prismaProfile.role,
      prismaProfile.avatarUrl,
    );
  }
}
