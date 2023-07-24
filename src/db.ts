import { createConnection, Connection } from 'typeorm/browser';
import dotenv from 'dotenv'

dotenv.config();

const connectionDB = async (): Promise<Connection> => {
  const connection = await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5434,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [],
    synchronize: process.env.ENVARIONMENT === 'dev',
    logging: true
  });

  return connection;
}

export default connectionDB;