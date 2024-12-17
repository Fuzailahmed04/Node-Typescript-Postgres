// import { FastifyReply, FastifyRequest } from "fastify";
// import jwt from "jsonwebtoken";
// import UserSession from "../models/session";


// declare module "fastify" {
//   interface FastifyRequest {
//     user?: any; 
//   }
//   const decoded: {
//     user_id: number;
//   }
// }

// export const userMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
//   const userHeader = request.headers["authorization"];
//   console.log("authHeader", userHeader);

//   if (!userHeader || !userHeader.startsWith("Bearer ")) {
//     return reply.status(401).send(errormsg("Unauthorized", 401));
//   }

//   const token: any = userHeader.replace("Bearer ", "");
//   console.log("Token", token);

//   try {
  
//     const decoded = jwt.decode(token) as { [x: string]: any; id: any } | null;
//     console.log("Decoded token", decoded);

//     if (!decoded || !decoded.user_id) {
//       return reply.status(401).send(errormsg("Invalid token payload.", 401));
//     }

//     const session = new UserSession(decoded.user_id, token);
//     console.log("decodeid", decoded.user_id);
//     console.log("my token", token);

//     if (!session) {
//       return reply.status(401).send(errormsg("Session not found or expired.", 401));
//     }

//     console.log("jwttoken", process.env.JWT_SECRET);

//     jwt.verify(token, process.env.JWT_SECRET || "secret", (err: any) => {
//       if (err) {
//         return reply.status(401).send(errormsg("Invalid or expired token.", 401));
//       }
//     });

  
//     request.user = session.user_id;

//   } catch (error) {
//     console.error("Error in authMiddleware:", error);
//     return reply.status(500).send(errormsg("Internal Server Error", 500));
//   }
// };

// function errormsg(arg0: string, arg1: number): unknown {
//   throw new Error("Function not implemented.");
// }
