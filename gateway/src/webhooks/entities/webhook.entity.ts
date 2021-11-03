import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  BaseEntity,
  RelationId,
  ManyToOne,
} from 'typeorm';

import { Account } from '@/accounts/entities/account.entity';

export type WebhookName = 'user.insert'
  | 'user.update'
  | 'user.remove'

@Entity()
export class Webhook extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  name: WebhookName;

  @Column()
  callbackUrl: string;

  @Column()
  @RelationId((webhook: Webhook) => webhook.account)
  accountId: number;

  @ManyToOne(() => Account, (account) => account.webhooks)
  account: Account;
}
