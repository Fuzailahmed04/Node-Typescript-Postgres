import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserSession } from "../models/session";
import { errorResponse } from "../helper/responseHelpers"; 

dotenv.config();

declare module "fastify" {
  interface FastifyRequest {
    user?: any; 
  }
  const decoded: {
    user_id: number;
  }
}

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  const authHeader = request.headers["authorization"];
  console.log("authHeader", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return reply.status(401).send(errorResponse("Unauthorized", 401));
  }

  const token: any = authHeader.replace("Bearer ", "");
  console.log("Token", token);

  try {
  
    const decoded = jwt.decode(token) as { [x: string]: any; id: any } | null;
    console.log("Decoded token", decoded);

    if (!decoded || !decoded.user_id) {
      return reply.status(401).send(errorResponse("Invalid token payload.", 401));
    }

    const session = new UserSession(decoded.user_id, token);
    console.log("decodeid", decoded.user_id);
    console.log("my token", token);

    if (!session) {
      return reply.status(401).send(errorResponse("Session not found or expired.", 401));
    }

    console.log("jwttoken", process.env.JWT_SECRET);

    jwt.verify(token, process.env.JWT_SECRET || "secret", (err: any) => {
      if (err) {
        return reply.status(401).send(errorResponse("Invalid or expired token.", 401));
      }
    });

  
    request.user = session.user_id;

  } catch (error) {
    console.error("Error in authMiddleware:", error);
    return reply.status(500).send(errorResponse("Internal Server Error", 500));
  }
};