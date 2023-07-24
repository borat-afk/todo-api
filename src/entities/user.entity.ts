import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Todo } from './todo.entity';
import { IUser } from '../types/user';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ip!: string;

  @Column()
  username!: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos!: Todo[];
}