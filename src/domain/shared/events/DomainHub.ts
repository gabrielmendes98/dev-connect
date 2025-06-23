/* eslint-disable @typescript-eslint/no-explicit-any */
import { AggregateRoot } from '../core/AggregateRoot';
import { IdVO } from '../value-objects/IdVO';
import { DomainEvent } from './DomainEvent';
import { EventHandler } from './EventHandler';

export class DomainHub {
  private static handlersMap: { [eventName: string]: EventHandler<any>[] } = {};
  private static markedAggregates: AggregateRoot[] = [];

  public static register(handler: EventHandler<any>, eventClassName: string): void {
    if (!this.handlersMap[eventClassName]) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(handler);
  }

  public static markAggregateForDispatch(aggregate: AggregateRoot): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.getId());
    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  public static dispatchEventsForAggregate(id: IdVO): void {
    const aggregate = this.findMarkedAggregateByID(id);
    if (aggregate) {
      aggregate.getDomainEvents().forEach((event: DomainEvent) => this.dispatch(event));
      aggregate.clearDomainEvents();
      this.removeAggregateFromMarked(aggregate);
    }
  }

  private static dispatch(event: DomainEvent): void {
    const eventClassName: string = event.constructor.name;
    if (this.handlersMap[eventClassName]) {
      const handlers = this.handlersMap[eventClassName];
      for (const handler of handlers) {
        handler.handle(event);
      }
    }
  }

  private static findMarkedAggregateByID(id: IdVO): AggregateRoot | undefined {
    return this.markedAggregates.find((a) => a.getId().equals(id));
  }
  private static removeAggregateFromMarked(aggregate: AggregateRoot): void {
    const index = this.markedAggregates.findIndex((a) => a.getId().equals(aggregate.getId()));
    this.markedAggregates.splice(index, 1);
  }
}
