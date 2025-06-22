import { EntityError } from '../../shared/errors/EntityError';
import { EmailVO } from '../../shared/value-objects/EmailVO';
import { HashedPasswordVO } from '../../shared/value-objects/HashedPasswordVO';
import { IdVO } from '../../shared/value-objects/IdVO';
import { PlainPasswordVO } from '../../shared/value-objects/PlainPasswordVO';
import { PasswordHasherService } from '../services/PasswordHasherService';
export class UserEntity {
  private readonly id: IdVO;
  private email: EmailVO;
  private passwordHash: HashedPasswordVO;
  private readonly profileId: IdVO;

  private constructor(id: IdVO, email: EmailVO, passwordHash: HashedPasswordVO, profileId: IdVO) {
    // Some validations if needed

    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.profileId = profileId;
  }

  public equals(other: UserEntity) {
    return other instanceof UserEntity && this.id.equals(other.id);
  }

  public static async registerNewUser(
    emailString: string,
    plainPasswordString: string,
    passwordHasher: PasswordHasherService,
  ): Promise<UserEntity> {
    const id = IdVO.create();
    const email = EmailVO.create(emailString);
    const plainPassword = PlainPasswordVO.create(plainPasswordString);
    const profileId = IdVO.create();

    const hashedPasswordString = await passwordHasher.hash(plainPassword.getValue());
    const hashedPasswordVO = HashedPasswordVO.fromString(hashedPasswordString);

    return new UserEntity(id, email, hashedPasswordVO, profileId);
  }

  public static fromPersistence(
    id: string,
    emailString: string,
    passwordHash: string,
    profileIdString: string,
  ): UserEntity {
    const userId = IdVO.fromString(id);
    const profileId = IdVO.fromString(profileIdString);
    const userEmail = EmailVO.create(emailString);
    const userHashedPassword = HashedPasswordVO.fromString(passwordHash);

    return new UserEntity(userId, userEmail, userHashedPassword, profileId);
  }

  public getId(): IdVO {
    return this.id;
  }

  public getEmail(): EmailVO {
    return this.email;
  }

  public getProfileId(): IdVO {
    return this.profileId;
  }

  public updateEmail(newEmailString: string) {
    const newEmail = EmailVO.create(newEmailString);
    this.email = newEmail;
  }

  public async changePassword(
    currentPlainPasswordString: string,
    newPlainPasswordString: string,
    hasher: PasswordHasherService,
  ) {
    const isCurrentPasswordCorrect = await this.passwordHash.compare(
      currentPlainPasswordString,
      hasher,
    );
    if (!isCurrentPasswordCorrect) {
      throw new EntityError('Current password is incorrect.');
    }

    const plainPassword = PlainPasswordVO.create(newPlainPasswordString);
    const newHashedPasswordString = await hasher.hash(plainPassword.getValue());
    this.passwordHash = HashedPasswordVO.fromString(newHashedPasswordString);
  }

  public async authenticate() {
    // TODO: Implement password authentication here
  }
}
