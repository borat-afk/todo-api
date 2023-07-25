import 'reflect-metadata';
import connectionDB from './db';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3002;

connectionDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log('-----------> JEBANA HUYNYA <------------------');
      console.log(`-------------------> SERVER is running on http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.log('-------------------> DATABASE connection error:', e);
  });
