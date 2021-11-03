import { Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Feature extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
