"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Закоментуйте рядок зі зв'язуванням "reflect-metadata", оскільки це потрібно лише для транспілювання TypeScript коду в JavaScript
// import "reflect-metadata";
const db_1 = __importDefault(require("./db"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3002;
(0, db_1.default)()
    .then(() => {
    app_1.default.listen(PORT, () => {
        console.log('-----------> JEBANA HUYNYA <------------------');
        console.log(`-------------------> SERVER is running on http://localhost:${PORT}`);
    });
})
    .catch((e) => {
    console.log('-------------------> DATABASE connection error:', e);
});
//# sourceMappingURL=server.js.map