// import { FastifyInstance } from 'fastify';
// import { registerUser } from '../controllers/userController';

// // Define a function that registers the routes in the Fastify instance
// export default async function userRoutes(fastify: FastifyInstance) {
//   fastify.route({
//     method: 'POST',
//     url: '/register',
//     schema: {
//       body: {
//         type: 'object',
//         properties: {
//           username: { type: 'string' },
//           password: { type: 'string' },
//           email: { type: 'string' }
//         },
//         required: ['username', 'password'],
//       },
//       response: {
//         201: {
//           type: 'object',
//           properties: {
//             message: { type: 'string' }
//           }
//         }
//       }
//     },
//     handler: registerUser // Use the handler function directly
//   });
// }
