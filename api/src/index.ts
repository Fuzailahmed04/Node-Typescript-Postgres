import Fastify from 'fastify';
import sequelizeInit from './config/sequelize-cli';  // Import the Sequelize instance
import userRoutes from './routes/userRoutes';

const fastify = Fastify({
  logger: true,
});

fastify.register(userRoutes);

const startServer = async () => {
  try {
    await sequelizeInit.authenticate(); 
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); 
  }

  fastify.get('/testing', async (request, reply) => {
    return { message: 'Hello Mr Fuzail' };
  });

  // Start the Fastify server
  try {
    await fastify.listen({ port: Number(process.env.API_PORT) || 4001, host: '0.0.0.0' });
    console.log(`Server is running at ${process.env.API_PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();
