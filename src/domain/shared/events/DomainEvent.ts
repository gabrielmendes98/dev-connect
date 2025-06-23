import { IdVO } from '../value-objects/IdVO';

export interface DomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): IdVO;
}
