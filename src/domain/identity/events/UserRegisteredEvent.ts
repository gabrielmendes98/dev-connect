import { DomainEvent } from '@domain/shared/events/DomainEvent';
import { EmailVO } from '@domain/shared/value-objects/EmailVO';
import { IdVO } from '@domain/shared/value-objects/IdVO';

export class UserRegisteredEvent implements DomainEvent {
  public dateTimeOccurred: Date;
  public readonly userId: IdVO;
  public readonly email: EmailVO;

  constructor(userId: IdVO, email: EmailVO) {
    this.dateTimeOccurred = new Date();
    this.userId = userId;
    this.email = email;
  }

  getAggregateId(): IdVO {
    throw this.userId;
  }
}
