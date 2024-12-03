import { Client } from 'pg';

const client = new Client({
  user: 'postgres', 
  host: 'localhost',
  database: 'BillingApp', 
  password: '123456', 
  port: 5433,
});

async function connectToDB() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');
  } catch (err: any) {
    console.error('Connection error:', err.message || err.stack);
  }
}

connectToDB();

export default client;
