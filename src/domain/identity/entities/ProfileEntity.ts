import { Entity } from '@domain/shared/core/Entity';
import { ErrorNotification } from '@domain/shared/error-notification/ErrorNotification';
import { EntityError } from '@domain/shared/errors/EntityError';
import { IdVO } from '@domain/shared/value-objects/IdVO';

export class ProfileEntity extends Entity {
  private constructor(
    protected readonly id: IdVO,
    private readonly userId: IdVO,
    private name: string | null,
    private username: string | null,
    private bio: string | null,
    private role: string | null,
    private avatarUrl: string | null,
  ) {
    super(id);
    this.userId = userId;
    this.name = name;
    this.bio = bio;
    this.role = role;
    this.avatarUrl = avatarUrl;
    this.username = username;
  }

  public static createInitialProfile(userId: IdVO): ProfileEntity {
    const profileId = IdVO.create();
    return new ProfileEntity(profileId, userId, null, null, null, null, null);
  }

  public static fromPersistence(
    idString: string,
    userIdString: string,
    name: string | null,
    username: string | null,
    bio: string | null,
    role: string | null,
    avatarUrl: string | null,
  ): ProfileEntity {
    const id = IdVO.fromString(idString);
    const userId = IdVO.fromString(userIdString);

    return new ProfileEntity(id, userId, name, username, bio, role, avatarUrl);
  }

  public getName() {
    return this.name;
  }

  public getUsername() {
    return this.username;
  }

  public getAvatarUrl() {
    return this.avatarUrl;
  }

  public getRole() {
    return this.role;
  }

  public getUserId() {
    return this.userId;
  }

  public getBio() {
    return this.bio;
  }

  private validateNewName(name: string) {
    const errorNotification = new ErrorNotification('Profile');
    if (!name) {
      errorNotification.addError('User name should not be empty');
    }

    if (name.length < 3 || name.length > 100) {
      errorNotification.addError('User name should have between 3 and 100 characters');
    }

    errorNotification.check();
  }

  private validateNewUsername(username: string) {
    const errorNotification = new ErrorNotification('Profile');
    if (!username) {
      errorNotification.addError('User username should not be empty');
    }

    if (username.length < 3 || username.length > 20) {
      errorNotification.addError('User username should have between 3 and 20 characters');
    }

    if (username.includes(' ')) {
      errorNotification.addError('User username should not contain spaces');
    }

    errorNotification.check();
  }

  private validateNewBio(bio: string) {
    const errorNotification = new ErrorNotification('Profile');
    if (!bio) {
      errorNotification.addError('User bio should not be empty');
    }

    if (bio.length < 3 || bio.length > 300) {
      errorNotification.addError('User bio should have between 3 and 300 characters');
    }

    errorNotification.check();
  }

  public updateName(newName: string) {
    this.validateNewName(newName);
    this.name = newName;
  }

  public updateAvatarUrl(newAvatarUrl: string) {
    this.avatarUrl = newAvatarUrl;
  }

  public updateUsername(newUsername: string) {
    this.validateNewUsername(newUsername);
    this.username = newUsername;
  }

  public updateBio(newBio: string) {
    this.validateNewBio(newBio);
    this.bio = newBio;
  }

  public isComplete() {
    return !!this.name && !!this.username && !!this.bio;
  }

  public completeProfile(name: string, username: string, bio: string) {
    this.updateName(name);
    this.updateUsername(username);
    this.updateBio(bio);
  }
}
