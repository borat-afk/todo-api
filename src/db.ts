import { createConnection, Connection } from 'typeorm';
import { User } from './entities/user.entity';
import { Todo } from './entities/todo.entity';
import dotenv from 'dotenv'

dotenv.config();

const connectionDB = async (): Promise<Connection> => {
  const connection = await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [User, Todo],
    synchronize: process.env.ENVARIONMENT === 'dev',
    logging: true
  });

  return connection;
}

export default connectionDB;