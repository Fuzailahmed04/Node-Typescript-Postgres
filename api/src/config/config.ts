import { Client } from 'pg';

const client = new Client({
  user: 'postgres', 
  host: 'localhost',
  database: 'postgres', 
  password: 'postgresql', 
  port: 5432,
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
