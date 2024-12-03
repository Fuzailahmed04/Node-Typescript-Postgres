import * as path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export default {
  migrationsTable: 'pgmigrations',
  dir: path.join(__dirname, 'migrations'),
  databaseUrl: process.env.DB_URL,  // Ensure this picks up DB_URL from .env
};
