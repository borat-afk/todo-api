import express from 'express';
import { getUserByIp, createUser } from '../controllers/UserController';

const router = express.Router();

router.get('/user', getUserByIp);

router.post('/user', createUser);

export default router;