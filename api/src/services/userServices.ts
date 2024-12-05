import client from '../config/config'; // Adjust the database connection
import bcrypt from 'bcrypt'; // Assuming you're hashing passwords

export const signupUser = async (email: string, password: string, username: string) => {
  try {
    // Check if the email already exists
    const result = await client.query('SELECT * FROM "users" WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      return null; // Email already in use
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await client.query(
      'INSERT INTO "users" (username, email, password, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *',
      [username, email, hashedPassword]
    );

    return newUser.rows[0]; // Return the newly created user
  } catch (error) {
    console.error('Signup error: ', error);
    throw new Error('Internal Server Error');
  }
};
