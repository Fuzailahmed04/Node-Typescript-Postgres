import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User  from "../models/userModels";
// // import { RedisClientType } from 'redis'; // Assuming you're using Redis for token storage

// Mock Redis client or use your implementation
// const redisClient: RedisClientType = {} as RedisClientType;
export const registerUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { username, email, password } = request.body as {
    username: string;
    email: string;
    password: string;
  };

  if (!username || !email || !password) {
    return reply
      .status(400)
      .send({ error: "Username, email, and password are required." });
  }

  try {
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return reply.status(400).send({ error: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    reply
      .status(201)
      .send({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    reply.status(500).send({ error: "Internal server error." });
  }
};
export const loginUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { success: false, error: "Invalid password" };
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return { success: true, token };
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, error: "Failed to log in." };
  }
};

export async function logoutUser(token: string): Promise<{ success: boolean; error?: string }> {
  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded) {
      return { success: false, error: 'Invalid or expired token.' };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Invalid or expired token.' };
  }
}
