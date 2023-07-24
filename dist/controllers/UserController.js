"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserByIp = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const getUserByIp = async (req, res) => {
    try {
        const ipAddress = req.ip; // Отримання IP-адреси з запиту
        const userRepository = (0, typeorm_1.getRepository)(user_entity_1.User);
        let user = await userRepository.findOne({ where: { ip: ipAddress } });
        if (!user)
            return res.status(401).json({ message: 'Unauthorised' });
        res.json(user);
    }
    catch (e) {
        res.status(500).json({ message: 'Failed to fetch user' });
    }
};
exports.getUserByIp = getUserByIp;
const createUser = async (req, res) => {
    try {
        const ipAddress = req.ip;
        const username = req.body.username;
        if (!username)
            return res.status(400).json({ message: 'Username required' });
        const userRepository = (0, typeorm_1.getRepository)(user_entity_1.User);
        const user = userRepository.create({ username, ip: ipAddress });
        await userRepository.save(user);
        res.status(201).json({ data: user, message: `User ${user.username} successfully created` });
    }
    catch (e) {
        res.status(500).json({ message: 'Create user error' });
    }
};
exports.createUser = createUser;
//# sourceMappingURL=UserController.js.map