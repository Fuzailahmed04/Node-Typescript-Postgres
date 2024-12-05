import { FastifyRequest, FastifyReply } from 'fastify';
import { signupUser } from '../services/userServices';

interface SignupRequestBody {
  username: string;
  email: string;
  password: string;
}

export const addUser = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { username, email, password } = req.body as SignupRequestBody;

    const user = await signupUser(email, password, username);

    if (!user) {
      return res.status(400).send({ error: 'Email already in use' });
    }

    return res.status(201).send({ message: 'User created successfully', user });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).send({ message: 'Error creating user', error: err.message });
    } else {
      return res.status(500).send({ message: 'Unknown error creating user' });
    }
  }
};
