import { UserRegisteredEvent } from '../../domain/identity/events/UserRegisteredEvent';
import { DomainHub } from '../../domain/shared/events/DomainHub';
import { EventHandler } from '../../domain/shared/events/EventHandler';

export class WelcomeEmailListener implements EventHandler<UserRegisteredEvent> {
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainHub.register(this, UserRegisteredEvent.name);
  }

  public async handle(event: UserRegisteredEvent): Promise<void> {
    console.log('======================================================');
    console.log(`Preparing to send welcome email...`);
    console.log(
      `EVENT: ${UserRegisteredEvent.name} - User registered with ID: ${event.userId.getValue()}`,
    );
    console.log(`Sending email to ${event.email.getValue()}...`);
    console.log('======================================================');
  }
}
