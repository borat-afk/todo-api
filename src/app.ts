import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import todoRoutes from './routes/todoRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', todoRoutes);

export default app;