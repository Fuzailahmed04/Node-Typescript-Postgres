import { User, mapUser } from '../models/userModels';
import client from '../database/database';

export const getUsers = async (): Promise<User[]> => {
  const result = await client.query('SELECT * FROM "users"')
  return result.rows.map(mapUser); 
};

export const createUser = async (name: string, email: string): Promise<User> => {
  const result = await client.query(
    'INSERT INTO "users" (name, email, created_at, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *', 
    [name, email]
  );
  return mapUser(result.rows[0]);  // Map the result to a User object
};
