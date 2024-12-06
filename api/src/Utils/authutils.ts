import  bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  console.error('JWT_SECRET is undefined. Check your .env file or dotenv configuration.');
  throw new Error('JWT_SECRET is not defined in the environment variables.');
}
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};


export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};


export const generateToken = (userId: number, username: string): string => {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' }); 
};


export const verifyToken = (token: string): any => {
  return jwt.verify(token, jwtSecret);
};
