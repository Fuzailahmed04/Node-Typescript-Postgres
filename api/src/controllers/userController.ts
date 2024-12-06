// import { FastifyReply, FastifyRequest } from 'fastify';
// import bcrypt from 'bcrypt';
// import { User } from '../models/userModels'; // Import the User model
// import { Sequelize } from 'sequelize';
// import { Op } from 'sequelize';

// export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
//   const { username, password, email } = request.body as {
//     username: string;
//     password: string;
//     email?: string;
//   };

//   if (!username || !password) {
//     return reply.status(400).send({ error: 'Username and password are required.' });
//   }

//   try {
//     // Check if the username or email already exists in the database
//     const existingUser = await User.findOne({
//       where: {
//         [Sequelize.Op]: [{ username }]
//       },
//     });

//     if (existingUser) {
//       return reply.status(400).send({ error: 'Username or email already in use.' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user instance
//     const user = await User.create({
//       username,
//       password: hashedPassword,
//       email
//     });

//     reply.status(201).send({ message: 'User registered successfully!' });
//   } catch (error) {
//     console.error(error);
//     reply.status(500).send({ error: 'Error registering user.' });
//   }
// };
