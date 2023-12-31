import { IUser } from './user';
import { TodoStatus } from '../enums/todo-status.enum';

export interface ITodo {
  id?: number;
  description: string;
  status: TodoStatus;
  createDate: Date;
  updateDate?: Date;
  user: IUser
}