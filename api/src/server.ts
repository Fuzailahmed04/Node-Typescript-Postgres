import app from './app';
import client from './database/database';
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const shutdown = async () => {
  console.log('Shutting down server...');
  // clie.close(() => {
  //   console.log('Server closed');
  // });

  // Close database connections
  try {
    await client.end();
    console.log('Database connection closed');
  } catch (err) {
    console.error('Error closing database connection:', err);
  }

  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);