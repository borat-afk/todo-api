import { getRepository } from 'typeorm';
import { Todo } from '../entities/todo.entity';

export const getTodoAggregation = async (todoId: number) => {
  const todoRepository = getRepository(Todo);

  const todo = await todoRepository
    .createQueryBuilder('todo')
    .leftJoinAndSelect('todo.user', 'user')
    .where('todo.id = :todoId', { todoId })
    .getOne();

  return todo;
}