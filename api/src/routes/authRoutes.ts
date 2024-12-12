import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController";
import { userValidationSchemas } from "../validation/user.validation"
import Joi from "joi";
import User from "../../models/User";
// const loginValidation = Joi.object({
//   email: Joi.string().email().required().description("User email address"),
//   password: Joi.string().required().description("User password"),
// }).options({ abortEarly: false });
export default async function userRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/register",
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
      const { error } = userValidationSchemas.registerUserValidation.validate(request.body);
      if (error) {
        return reply.status(400).send({ error: error.details[0].message });
      }

      const { email } = request.body as { email: string };
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return reply.status(400).send({ error: "Email already exists!" });
      }
    },
    handler: async (request, reply) => {
      return registerUser(request, reply);
    },
  });

  fastify.route({
    method: "POST",
    url: "/login",
    schema: {
      body: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 },
        },
        required: ["email", "password"],
      },
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const { email, password } = request.body as {
        email: string;
        password: string;
      };

      if (!email || !password) {
        return reply
          .status(400)
          .send({ error: "Email and password are required." });
      }

      try {
        const result = await loginUser(email, password);
        return reply.status(200).send(result);
      } catch (err) {
        return reply.status(401).send({ error: "Invalid email or password" });
      }
    },
  });

  fastify.route({
    method: "DELETE",
    url: "/logout",
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const authHeader = request.headers["authorization"];

        if (!authHeader) {
          return reply
            .status(401)
            .send({ error: "No token provided, unauthorized." });
        }

        const token = authHeader.replace("Bearer ", "");

        const result = await logoutUser(token);

        if (result.success) {
          return reply
            .status(200)
            .send({ message: "User logged out successfully." });
        }

        return reply.status(400).send({ error: result.error });
      } catch (error) {
        return reply.status(500).send({ error: "Internal server error." });
      }
    },
  });
}
