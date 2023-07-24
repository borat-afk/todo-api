"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TodoController_1 = require("../controllers/TodoController");
const router = express_1.default.Router();
router.post('/todos/:userId', TodoController_1.createTodo);
router.get('/todos/:userId', TodoController_1.getTodosByUser);
router.patch('/todos/:todoId', TodoController_1.updateTodoStatus);
router.delete('/todos/:todoId', TodoController_1.removeTodo);
exports.default = router;
//# sourceMappingURL=todoRoutes.js.map