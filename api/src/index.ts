import Fastify from 'fastify';
import { Configuration, CountryCode, PlaidApi, PlaidEnvironments, Products } from 'plaid';
import sequelizeInit from './config/sequelize';
import authRoute from './routes/auth';
import rentalRoutes from './routes/rental';

const fastify = Fastify({ logger: true });

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID; 
const PLAID_SECRET = process.env.PLAID_SECRET ;

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

// Routes

fastify.post('/api/create_link_token', async (request, reply) => {
  try {
    const createTokenResponse = await plaidClient.linkTokenCreate({
      user: { client_user_id: 'user-id' },
      client_name: 'Your App Name',
      products: [Products.Auth, Products.Transactions],
      country_codes: [CountryCode.Us], 
      language: 'en',
    });
    reply.send({ link_token: createTokenResponse.data.link_token });
  } catch (error) {
    console.error('Error creating link token:', error);
    reply.status(500).send({ error: 'Failed to create link token' });
  }
});


fastify.post('/api/create_public_token', async (request, reply) => {
  const { institution_id, initial_products } = request.body as {
    institution_id: string;
    initial_products: Products[];
    link_token:string;
  };

  if (!institution_id || !initial_products) {
    return reply.status(400).send({ error: 'Missing institution_id or initial_products' });
  }

  try {
    const response = await plaidClient.sandboxPublicTokenCreate({
      institution_id,
      initial_products,
    });

    reply.send({ public_token: response.data.public_token });
  } catch (error:any) {
    console.error('Error creating public token:', error.response?.data || error.message);
    reply.status(500).send({ error: 'Failed to create public token' });
  }
});


fastify.post('/api/exchange_public_token', async (request, reply) => {
  const { public_token } = request.body as { public_token: string };

  if (!public_token) {
    reply.status(400).send({ error: 'Missing public_token in the request body' });
    return;
  }

  try {
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });
    const accessToken = exchangeResponse.data.access_token;
    reply.send({ access_token: accessToken });
  } catch (error:any) {
    console.error('Error exchanging public token:', error.response?.data || error.message);
    reply.status(500).send({ error: 'Failed to exchange public token' });
  }
});


fastify.post('/api/get_account_info', async (request, reply) => {
  const access_token  = request.body as string; 
  try {
    const accountsResponse = await plaidClient.accountsGet({
      access_token: access_token,
    });
    reply.send(accountsResponse.data);
  } catch (error) {
    console.error('Error getting account info:', error);
    reply.status(500).send({ error: 'Failed to get account information' });
  }
});

fastify.register(authRoute);
fastify.register(rentalRoutes);

const startServer = async () => {
  try {
    await sequelizeInit.authenticate();
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }

  fastify.get('/testing', async (request, reply) => {
    return { message: 'Hello Sabahat' };
  });

  try {
    await fastify.listen({ port: Number(process.env.API_PORT) || 4001, host: '0.0.0.0' });
    console.log(`Server is running at ${process.env.API_PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();
