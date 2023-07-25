"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserByIp = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const getUserByIp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ipAddress = req.ip; // Отримання IP-адреси з запиту
        const userRepository = (0, typeorm_1.getRepository)(user_entity_1.User);
        let user = yield userRepository.findOne({ where: { ip: ipAddress } });
        if (!user)
            return res.status(401).json({ message: 'Unauthorised' });
        res.json(user);
    }
    catch (e) {
        res.status(500).json({ message: 'Failed to fetch user' });
    }
});
exports.getUserByIp = getUserByIp;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ipAddress = req.ip;
        const username = req.body.username;
        if (!username)
            return res.status(400).json({ message: 'Username required' });
        const userRepository = (0, typeorm_1.getRepository)(user_entity_1.User);
        const user = userRepository.create({ username, ip: ipAddress });
        yield userRepository.save(user);
        res.status(201).json({ data: user, message: `User ${user.username} successfully created` });
    }
    catch (e) {
        res.status(500).json({ message: 'Create user error' });
    }
});
exports.createUser = createUser;
//# sourceMappingURL=UserController.js.map