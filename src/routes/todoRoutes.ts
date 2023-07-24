import express from 'express';
import { createTodo, getTodosByUser, updateTodoStatus, removeTodo } from '../controllers/TodoController';

const router = express.Router();

router.post('/todos/:userId', createTodo);

router.get('/todos/:userId', getTodosByUser);

router.patch('/todos/:todoId', updateTodoStatus);

router.delete('/todos/:todoId', removeTodo);

export default router;