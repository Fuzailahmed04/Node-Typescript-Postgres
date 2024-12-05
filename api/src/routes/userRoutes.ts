import { FastifyInstance, FastifyRequest, FastifyReply, fastify } from 'fastify';
import { addUser } from '../controllers/userController';
import { userValidationSchemas } from '../validation/user.validation';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/signup',
    {
      schema: {
        body: userValidationSchemas.createUser,
      },
    },
    addUser 
  );
}




  // Route for user login
  // fastify.post(
  //   '/login',
  //   {
  //     schema: {
  //       body: userValidationSchemas.loginUser, // Login validation schema
  //     },
  //   },
//     async (request: FastifyRequest, reply: FastifyReply) => {
//       try {
//         const { email, password } = request.body;

//         // Implementing login logic
//         const user = await loginUser(email, password);

//         if (!user) {
//           return reply.status(401).send({ error: 'Invalid credentials' });
//         }

//         // Returning successful login response with user data (excluding password)
//         return reply.status(200).send({
//           message: 'Login successful',
//           user: { email: user.email, username: user.username }, // Ensure you return only relevant data
//         });
//       } catch (error) {
//         return reply.status(500).send({ error: 'Internal Server Error' });
//       }
//     }
//   );
// }
