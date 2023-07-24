import { ITodo } from './todo';

export interface IUser {
  id?: number;
  ip: string;
  username: string;
  todos: ITodo[];
}