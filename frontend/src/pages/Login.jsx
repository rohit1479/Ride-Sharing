import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { userService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ 
        email: '',
        userPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name === 'password' ? 'userPassword' : e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Attempting login with:', credentials);
            const response = await userService.login(credentials);
            console.log('Login response:', response);
            if (response.data) {
                console.log('Login successful, navigating to dashboard');
                navigate('/dashboard');
            } else {
                console.log('Login failed: no data in response');
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error('Login failed:', error.response || error);
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                        {error}
                    </Alert>
                )}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={credentials.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
