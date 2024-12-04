import { Request, Response } from 'express';
import { getUsers, createUser } from '../services/userServices';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: 'Error fetching users', error: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error fetching users' });
    }
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;
    const user = await createUser(username, email);
    res.status(201).json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: 'Error creating user', error: err.message });
    } else {
      res.status(500).json({ message: 'Unknown error creating user' });
    }
  }
};
