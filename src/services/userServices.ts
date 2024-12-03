// src/services/userService.ts
import { User, mapUser } from '../models/userModels';
import client from '../database/database';

// Fetch all users from the database
export const getUsers = async (): Promise<User[]> => {
  const result = await client.query('SELECT * FROM User');
  return result.rows.map(mapUser); // Map the rows to User objects
};

// Create a new user in the database
export const createUser = async (name: string, email: string): Promise<User> => {
  const result = await client.query(
    'INSERT INTO users(name, email, created_at, updated_at) VALUES($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *',
    [name, email]
  );
  return mapUser(result.rows[0]); // Return the mapped User object
};
