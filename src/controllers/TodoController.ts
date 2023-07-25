import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { User } from '../entities/user.entity';
import { TodoStatus } from '../enums/todo-status.enum';
import { getTodoAggregation } from '../aggreration/getTodo.aggregation';

export const createTodo = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const userId = +req.params.userId;
    const { description } = req.body;

    if (!description || !userId) return res.status(400).json({ message: 'Description and userId are required' });

    const userRepository = getRepository(User);
    const user = await userRepository.findOneById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const todoRepository = getRepository(Todo);
    const newTodo = todoRepository.create({
      description,
      status: TodoStatus.New,
      user,
    });

    await todoRepository.save(newTodo);

    res.status(201).json({ data: newTodo, message: 'Todo successfully created' });
  } catch (e) {
    res.status(500).json({ message: 'Create todo error' });
  }
};

export const getTodosByUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const userId = +req.params.userId;

    const todoRepository = getRepository(Todo);
    const todoList = await todoRepository
      .createQueryBuilder('todo')
      .leftJoinAndSelect('todo.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();

    if (!todoList.length) {
      return res.status(404).json({ message: 'Todos not found for the user' });
    }

    res.json(todoList);
  } catch (e) {
    res.status(500).json({ message: 'Fetch todos error' });
  }
};

export const updateTodoStatus = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const todoId = +req.params.todoId;
    const status = req.body.status;
    const ipAddress = req.ip;

    if (!status || !(status in TodoStatus)) {
      res.status(400).json({ message: 'Invalid status' });
      return;
    }

    const todo = await getTodoAggregation(todoId);

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    const todoUser = todo.user;

    if (todoUser.ip !== ipAddress) return res.status(403).json({ message: 'Access denied' });

    todo.status = status;

    const todoRepository = getRepository(Todo);
    await todoRepository.save(todo);

    res.status(201).json({ data: todo, message: 'Todo status updated' });
  } catch (e) {
    res.status(500).json({ message: 'Update todo error' });
  }
};

export const removeTodo = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const todoId = +req.params.todoId;
    const ipAddress = req.ip;

    const todo = await getTodoAggregation(todoId);

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    const todoUser = todo.user;

    if (todoUser.ip !== ipAddress) return res.status(403).json({ message: 'Access denied' });

    const todoRepository = getRepository(Todo);
    await todoRepository.remove(todo);

    res.status(201).json({ message: 'Todo was successfully removed' });
  } catch (e) {
    res.status(500).json({ message: 'Remove todo error' });
  }
};