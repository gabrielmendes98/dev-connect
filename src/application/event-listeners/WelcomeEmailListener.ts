import { UserRegisteredEvent } from '@domain/identity/events/UserRegisteredEvent';
import { DomainHub } from '@domain/shared/events/DomainHub';
import { EventHandler } from '@domain/shared/events/EventHandler';
import { Logger } from '@application/shared/ports/Logger';

export class WelcomeEmailListener implements EventHandler<UserRegisteredEvent> {
  constructor(private readonly logger: Logger) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainHub.register(this, UserRegisteredEvent.name);
  }

  public async handle(event: UserRegisteredEvent): Promise<void> {
    this.logger.debug('======================================================');
    this.logger.debug(`Preparing to send welcome email...`);
    this.logger.debug(
      `EVENT: ${UserRegisteredEvent.name} - User registered with ID: ${event.userId.getValue()}`,
    );
    this.logger.debug(`Sending email to ${event.email.getValue()}...`);
    this.logger.debug('======================================================');
  }
}
