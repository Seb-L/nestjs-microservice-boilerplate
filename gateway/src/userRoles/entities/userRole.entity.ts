import {
  BaseEntity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  Entity,
  Column,
  JoinColumn,
} from 'typeorm';

import { Role } from '@/roles/entities/role.entity';
import { User } from '@/users/entities/user.entity';

@Entity()
export class UserRole extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // roleId: number;

  @ManyToOne(() => Role, (role) => role.userRole)
  role: Role;

  @ManyToOne(() => User, (user) => user.roles)
  user: User;
}
