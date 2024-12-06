// import { User, mapUser } from '../models/userModels';
// import client from '../database/database';

// export const getUsers = async (): Promise<User[]> => {
//   const result = await client.query('SELECT * FROM "users"')
//   return result.rows.map(mapUser); 
// };

// export const createUser = async (username: string, password: string): Promise<User> => {
//   const result = await client.query(
//     'INSERT INTO "users" (username, email, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *', 
//     [username, password]
//   );
//   return mapUser(result.rows[0]);  // Map the result to a User object
// };
// export const getUserByEmail = async (email: string) => {
//   const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
//   return result.rows[0]; // Return the first user found, or undefined if no user exists
// };
// export const getUserByUsername = async (username: string) => {
//   const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
//   return result.rows[0]; // Return the first user found, or undefined if no user exists
// };