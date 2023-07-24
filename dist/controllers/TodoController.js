"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTodo = exports.updateTodoStatus = exports.getTodosByUser = exports.createTodo = void 0;
const typeorm_1 = require("typeorm");
const todo_entity_1 = require("../entities/todo.entity");
const user_entity_1 = require("../entities/user.entity");
const todo_status_enum_1 = require("../enums/todo-status.enum");
const createTodo = async (req, res) => {
    try {
        const userId = +req.params.userId;
        const { description } = req.body;
        if (!description || !userId)
            return res.status(400).json({ message: 'Description and userId are required' });
        const userRepository = (0, typeorm_1.getRepository)(user_entity_1.User);
        const user = await userRepository.findOneById(userId);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        const todoRepository = (0, typeorm_1.getRepository)(todo_entity_1.Todo);
        const newTodo = todoRepository.create({
            description,
            status: todo_status_enum_1.TodoStatus.New,
            user,
        });
        await todoRepository.save(newTodo);
        res.status(201).json({ data: newTodo, message: 'Todo successfully created' });
    }
    catch (e) {
        res.status(500).json({ message: 'Create todo error' });
    }
};
exports.createTodo = createTodo;
const getTodosByUser = async (req, res) => {
    try {
        const userId = +req.params.userId;
        const userRepository = (0, typeorm_1.getRepository)(user_entity_1.User);
        const user = await userRepository.findOneById(userId);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.json(user.todos);
    }
    catch (e) {
        res.status(500).json({ message: 'Fetch todos error' });
    }
};
exports.getTodosByUser = getTodosByUser;
const updateTodoStatus = async (req, res) => {
    try {
        const todoId = +req.params.todoId;
        const status = req.body.status;
        if (!status || !(status in todo_status_enum_1.TodoStatus)) {
            res.status(400).json({ message: 'Invalid status' });
            return;
        }
        const todoRepository = (0, typeorm_1.getRepository)(todo_entity_1.Todo);
        const todo = await todoRepository.findOneById(todoId);
        if (!todo)
            return res.status(404).json({ message: 'Todo not found' });
        todo.status = status;
        await todoRepository.save(todo);
        res.status(201).json({ data: todo, message: 'Todo status updated' });
    }
    catch (e) {
    }
};
exports.updateTodoStatus = updateTodoStatus;
const removeTodo = async (req, res) => {
    try {
        const todoId = +req.params.todoId;
        const ipAddress = req.ip;
        const todoRepository = (0, typeorm_1.getRepository)(todo_entity_1.Todo);
        const todo = await todoRepository.findOneById(todoId);
        if (!todo)
            return res.status(404).json({ message: 'Todo not found' });
        const todoUser = todo.user;
        if (todoUser.ip !== ipAddress)
            return res.status(403).json({ message: 'Access denied' });
        await todoRepository.remove(todo);
        res.status(201).json({ message: 'Todo was successfully removed' });
    }
    catch (e) {
        res.status(500).json({ message: 'Remove todo error' });
    }
};
exports.removeTodo = removeTodo;
//# sourceMappingURL=TodoController.js.map