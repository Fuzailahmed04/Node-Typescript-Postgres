// src/controllers/userController.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import { UserSession } from "../../models/userSessionModel";
import { successResponse, errorResponse } from '../helper/responseHelpers';
import dotenv from "dotenv";
import { generateOTP } from '../helper/otpGenrate';
import { otpStore, sendEmail } from '../middlewares/emailservice';
dotenv.config();
export interface LoginRequestBody {
  email: string;
  password: string;
}


export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, email, password } = request.body as {
    username: string;
    email: string;
    password: string;
  };

  if (!username || !email || !password) {
    return reply.status(400).send(errorResponse("Username, email, and password are required.", 400));
  }

  try {
    console.log("check before first user exist");

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return reply.status(400).send(errorResponse("Email already in use.", 400));
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    console.log("check before creating new user");

    const newUser = await User.create({
      username,
      email,
      password,
    });

    return reply.status(201).send(successResponse("User registered successfully!", newUser, 201));
  } catch (error) {
    console.error("Error registering user:", error);
    return reply.status(500).send(errorResponse("Internal server error.", 500));
  }
};

export const sendOtp = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email } = request.body as { email: string };

  if (!email) {
    return reply.status(400).send(errorResponse("Email is required", 400));
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return reply.status(404).send(errorResponse("User not found", 404));
    }
    const otp = generateOTP();

    const expiresAt = Date.now() + 5 * 60 * 1000;
    otpStore[email] = { otp, expiresAt };
    console.log("otp store", otpStore)
    await sendEmail(email, "Your Login OTP", `<p>Your OTP is: <b>${otp}</b></p>`);

    return reply.status(200).send(successResponse("OTP sent successfully. Please verify.", null, 200));
  } catch (err) {
    console.error("Error during OTP sending:", err);
    return reply.status(500).send(errorResponse("Internal server error", 500));
  }
};

export const loginUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, otp } = request.body as { email: string; otp: string };

  if (!email || !otp) {
    return reply.status(400).send(errorResponse("Email and OTP are required.", 400));
  }

  try {
    console.log("login otp", otpStore);
    const storedOtp = otpStore[email];
    if (!storedOtp || storedOtp.otp !== otp || Date.now() > storedOtp.expiresAt) {
      return reply.status(400).send(errorResponse("Invalid or expired OTP.", 400));
    }

    console.log("otp Store", otpStore);
    delete otpStore[email];

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return reply.status(404).send(errorResponse("User not found", 404));
    }

    const token = jwt.sign(
      { user_id: user.dataValues.user_id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    await UserSession.create({ user_id: user.dataValues.user_id, token });


    const userProfile = {
      user_id: user.dataValues.user_id,
      email: user.dataValues.email,
      username: user.dataValues.username,
    };

    return reply
      .status(200)
      .send(successResponse("Login successful", { token, user: userProfile }, 200));
  } catch (err) {
    console.error("Error during login:", err);
    return reply.status(500).send(errorResponse("Internal server error", 500));
  }
};

export async function logoutUser(token: string): Promise<{ success: boolean; error?: string }> {
  try {
    console.log("Received token:", token);

    await UserSession.destroy({ where: { token } });

    console.log("Session deleted successfully for token:", token);
    return { success: true };
  } catch (error) {
    console.error("Error during logout:", error);
    return { success: false, error: "Invalid or expired token." };
  }
}


