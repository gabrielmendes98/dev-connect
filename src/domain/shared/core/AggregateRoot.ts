import { DomainEvent } from '../events/DomainEvent';
import { DomainHub } from '../events/DomainHub';
import { Entity } from './Entity';

export abstract class AggregateRoot extends Entity {
  private _domainEvents: DomainEvent[] = [];

  public getDomainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  public clearDomainEvents(): void {
    this._domainEvents = [];
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainHub.markAggregateForDispatch(this);
  }
}
