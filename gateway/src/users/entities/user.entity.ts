import { Exclude, Transform } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  BaseEntity,
  RelationId,
  OneToMany,
} from 'typeorm';

import { Account } from '@/accounts/entities/account.entity';
import { UserRole } from '@/userRoles/entities/userRole.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  username: string;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: false })
  twoFactor: boolean;

  @Exclude()
  @Column({ nullable: true })
  twoFactorAuthenticationSecret: string;

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  updatedAt: Date;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  lastLogin: Date;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @RelationId((user: User) => user.account)
  @Column({ nullable: true })
  accountId: number;

  @ManyToOne(() => Account, (account) => account.users)
  account: Account;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  @Transform(({ value }) => value.map((row) => row.role.name))
  roles: UserRole[];
}
