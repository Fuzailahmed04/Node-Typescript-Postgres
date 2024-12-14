import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { loginUser,addUser,logoutUser} from "../controllers/userController";
import { userValidationSchemas } from "../validation/userValidation";
import User from "../models/user";
import { userMiddleware } from "../middlewares/userMiddleware";
import { successmsg, errormsg } from "../handlers/responseHandlers"; 

export default async function userRoutes(fastify: FastifyInstance) {

  fastify.route({
    method: "POST",
    url: "/signup",
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
      const { error } = userValidationSchemas.registerUserValidation.validate(request.body);
      if (error) {
        return reply.status(400).send(errormsg(error.details[0].message, 400));
      }

      const { email } = request.body as { email: string };
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return reply.status(400).send(errormsg("Email already exists!", 400));
      }
    },
    handler: async (request, reply) => {
      try {
        const result = await addUser(request, reply);
        return reply.status(201).send(successmsg("User registered successfully!", result, 201));
      } catch (error) {
        console.error("Error during signup:", error);
        return reply.status(500).send(errormsg("Internal server error.", 500));
      }
    },
  });

  fastify.route({
    method: "POST",
    url: "/login",
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const { error } = userValidationSchemas.loginUser.validate(request.body);
      if (error) {
        return reply.status(400).send(errormsg(error.details[0].message, 400));
      }

      const { email, password } = request.body as { email: string; password: string };

      if (!email || !password) {
        return reply.status(400).send(errormsg("Email and password are required.", 400));
      }

      try {
        const result = await loginUser(request, reply);
        return reply.status(200).send(successmsg("Login successful", result, 200));
      } catch (err) {
        console.error("Error during login:", err);
        return reply.status(401).send(errormsg("Invalid email or password", 401));
      }
    },
  });

  fastify.route({
    method: "DELETE",
    url: "/logout",
    preHandler: userMiddleware,
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const token = (request.headers["authorization"] || "").replace("Bearer ", "");
  
        const result = await logoutUser(token);
  
        // Ensure result has a success property (use type assertion if necessary)
        if (result.success) {
          return reply.status(200).send(successmsg("User logged out successfully.", {}, 200));
        }
  
        return reply.status(400).send(errormsg(result.error || "Logout failed.", 400));
      } catch (error) {
        console.error("Error during logout:", error);
        return reply.status(500).send(errormsg("Internal server error.", 500));
      }
    },
  });
  
}
