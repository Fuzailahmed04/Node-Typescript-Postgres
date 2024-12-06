import { Sequelize, Op } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'postgres',    // Database name
  process.env.DB_USER || 'postgres',   // Database username
  process.env.DB_PASS || 'postgresql', // Database password
  {
    host: process.env.DB_HOST || 'localhost', // Hostname
    dialect: 'postgres',                      // Database dialect
    port: parseInt(process.env.DB_PORT || '5432', 10), // Port number
    logging: false, // Disable SQL query logging for cleaner output
  }
);

async function connectToDB() {
  try {
    await sequelize.authenticate();  // Test the connection
    console.log('Connected to PostgreSQL successfully!');
  } catch (error: any) {
    console.error('Unable to connect to the database:', error.message || error.stack);
    process.exit(1); // Exit the process if the connection fails
  }
}

// Initialize connection on startup
connectToDB();

// Exporting `sequelize` and `Op` properly
export { sequelize, Op };
