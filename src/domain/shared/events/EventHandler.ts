import { DomainEvent } from './DomainEvent';

export interface EventHandler<T extends DomainEvent> {
  setupSubscriptions(): void;
  handle(event: T): Promise<void>;
}
