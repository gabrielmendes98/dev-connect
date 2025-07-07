import { DomainEvent } from '@domain/shared/events/DomainEvent';
import { IdVO } from '@domain/shared/value-objects/IdVO';

export class DiscussionCommentAddedEvent implements DomainEvent {
  public dateTimeOccurred: Date;

  constructor(
    public readonly discussionId: IdVO,
    public readonly commentAuthorId: IdVO,
    public readonly commentText: string,
  ) {
    this.dateTimeOccurred = new Date();
  }

  getAggregateId(): IdVO {
    return this.discussionId;
  }
}
