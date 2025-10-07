import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Avatar,
    Box,
    Alert
} from '@mui/material';
import { userService } from '../services/api';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        city: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await userService.getUserProfile();
            setProfile(response.data);
        } catch (error) {
            setError('Failed to load profile');
            console.error('Error loading profile:', error);
        }
    };

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.editUser(profile);
            setSuccess('Profile updated successfully');
            setError('');
        } catch (error) {
            setError('Failed to update profile');
            setSuccess('');
            console.error('Error updating profile:', error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            bgcolor: 'primary.main',
                            fontSize: '2rem',
                            mb: 2
                        }}
                    >
                        {profile.name?.charAt(0) || 'U'}
                    </Avatar>
                    <Typography variant="h4" gutterBottom>
                        My Profile
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        {success}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={profile.email}
                                disabled
                                helperText="Email cannot be changed"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={profile.city}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                >
                                    Update Profile
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Profile;