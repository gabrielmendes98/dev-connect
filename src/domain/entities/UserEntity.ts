import { PasswordHasherService } from '../services/PasswordHasherService';
import { EmailVO } from '../value-objects/EmailVO';
import { HashedPasswordVO } from '../value-objects/HashedPasswordVO';
import { IdVO } from '../value-objects/IdVO';
import { PlainPasswordVO } from '../value-objects/PlainPasswordVO';
import { EntityError } from './EntityError';

export class UserEntity {
  private readonly id: IdVO;
  private name: string;
  private email: EmailVO;
  private passwordHash: HashedPasswordVO;
  private bio: string;
  private role: string;
  private avatarUrl: string | null; // Could be renamed to avatar and converted to VO if avatar was more complex

  private constructor(
    id: IdVO,
    name: string,
    email: EmailVO,
    passwordHash: HashedPasswordVO,
    bio: string,
    role: string,
    avatarUrl: string | null,
  ) {
    this.validateName(name);
    // Other validations

    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.bio = bio;
    this.role = role;
    this.avatarUrl = avatarUrl;
  }

  public equals(other: UserEntity) {
    return other instanceof UserEntity && this.id.equals(other.id);
  }

  public static async registerNewUser(
    name: string,
    emailString: string,
    plainPasswordString: string,
    role: string,
    bio: string,
    avatarUrl: string | null = null,
    passwordHasher: PasswordHasherService,
  ): Promise<UserEntity> {
    const id = IdVO.create();
    const email = EmailVO.create(emailString);
    const plainPassword = PlainPasswordVO.create(plainPasswordString);

    const hashedPasswordString = await passwordHasher.hash(plainPassword.getValue());
    const hashedPasswordVO = HashedPasswordVO.fromString(hashedPasswordString);

    return new UserEntity(id, name, email, hashedPasswordVO, bio, role, avatarUrl);
  }

  public static fromPersistence(
    id: string,
    name: string,
    emailString: string,
    passwordHash: string,
    bio: string,
    role: string,
    avatarUrl: string | null = null,
  ): UserEntity {
    const userId = IdVO.fromString(id);
    const userEmail = EmailVO.create(emailString);
    const userHashedPassword = HashedPasswordVO.fromString(passwordHash);

    return new UserEntity(userId, name, userEmail, userHashedPassword, bio, role, avatarUrl);
  }

  public getId(): IdVO {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): EmailVO {
    return this.email;
  }

  public getPasswordHash(): HashedPasswordVO {
    return this.passwordHash;
  }

  public getBio(): string {
    return this.bio;
  }

  public getRole(): string {
    return this.role;
  }

  public getAvatarUrl(): string | null {
    return this.avatarUrl;
  }

  private validateName(name: string) {
    if (!name) {
      throw new EntityError('User name should not be empty');
    }

    if (name.length < 3 || name.length > 100) {
      throw new EntityError('User name should have between 3 and 100 characters');
    }
  }

  public updateName(newName: string) {
    this.validateName(newName);
    this.name = newName;
  }

  public updateEmail(newEmailString: string) {
    // Validate email
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
