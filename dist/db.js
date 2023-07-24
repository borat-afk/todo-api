"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = require("typeorm/browser");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectionDB = async () => {
    const connection = await (0, browser_1.createConnection)({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        entities: [],
        synchronize: process.env.ENVARIONMENT === 'dev',
        logging: true
    });
    return connection;
};
exports.default = connectionDB;
//# sourceMappingURL=db.js.map