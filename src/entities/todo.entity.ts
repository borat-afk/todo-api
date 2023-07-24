import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { ITodo } from '../types/todo';
import { TodoStatus } from '../enums/todo-status.enum';

@Entity()
export class Todo implements ITodo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  description!: string;

  @Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.New })
  status!: TodoStatus;

  @ManyToOne(() => User, (user) => user.todos)
  user!: User;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;
}