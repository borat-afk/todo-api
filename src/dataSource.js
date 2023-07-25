import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['./dist/entities/*.js'],
  migrations: ['./src/migrations/**/*{.js,.ts}'],
  logging: true,
});

dataSource.initialize();

export default dataSource;
