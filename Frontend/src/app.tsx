import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';

// Define types for user data
interface User {
  email: string;
  name: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Handle GET request
  const fetchUsers = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get<User[]>('http://localhost:3000/billingapp/users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  // Handle POST request
  const createUser = async (): Promise<void> => {
    if (!email || !name) {
      setError('Email and Name are required');
      return;
    }
    try {
      setLoading(true);
      await axios.post('http://localhost:3000/billingapp/user', { email, name });
      setError('');
      setEmail('');
      setName('');
      fetchUsers(); // Re-fetch users after adding a new one
      setLoading(false);
    } catch (err) {
      setError('Failed to create user');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">
        User Management
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Add User
                </Typography>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={createUser}
                  sx={{ mt: 2 }}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Create User'}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Users List
                </Typography>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={fetchUsers}
                  sx={{ mb: 2 }}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Fetch Users'}
                </Button>

                {users.length === 0 ? (
                  <Typography variant="body1" color="textSecondary">
                    No users found.
                  </Typography>
                ) : (
                  users.map((user, index) => (
                    <Box key={index} sx={{ mb: 1 }}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="body1">{user.name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {user.email}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  ))
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default App;
