import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  RelationId,
  ManyToOne,
  Generated,
} from 'typeorm';

import { Account } from '@/accounts/entities/account.entity';

@Entity()
export class App extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @RelationId((app: App) => app.account)
  accountId: number;

  @ManyToOne(() => Account, (account) => account.apps)
  account: number;

  @Column()
  name: string;

  @Column()
  @Generated('uuid')
  clientId: string;

  @Column()
  originUrl: string;

  // @Column()
  // secretToken: string;
}
