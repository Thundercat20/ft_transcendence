
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 32,
    unique: true,
  })
  username!: string;

  @Column({
    type: 'varchar',
    length: 254,
    unique: true,
  })
  email!: string;

  @Column({
    name: 'password_hash',
    type: 'varchar',
    length: 255,
  })
  passwordHash!: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt!: Date;
}
