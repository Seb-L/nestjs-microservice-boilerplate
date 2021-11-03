import { EventEmitter2 } from 'eventemitter2';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';

import { WebhookEvent } from '@/webhooks/events/webhook.event';

import { User } from './entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(connection: Connection, private eventEmitter: EventEmitter2) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  afterInsert(event: InsertEvent<User>) {
    this.eventEmitter.emit(
      'webhook',
      new WebhookEvent({
        name: 'user.insert',
        accountId: event.entity.accountId,
        payload: event.entity,
      }),
    );
  }

  afterUpdate(event: UpdateEvent<User>) {
    this.eventEmitter.emit(
      'webhook',
      new WebhookEvent({
        name: 'user.update',
        accountId: event.entity.accountId,
        payload: event.entity,
      }),
    );
  }

  afterRemove(event: RemoveEvent<User>) {
    this.eventEmitter.emit(
      'webhook',
      new WebhookEvent({
        name: 'user.remove',
        accountId: event.entity.accountId,
        payload: event.entity,
      }),
    );
  }
}
