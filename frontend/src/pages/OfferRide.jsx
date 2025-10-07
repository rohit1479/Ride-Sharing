import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Grid, Paper, Alert, useTheme, useMediaQuery } from '@mui/material';
import { rideService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const OfferRide = () => {
    const [rideData, setRideData] = useState({
        source: '',
        destination: '',
        date: '',
        time: '',
        offerSeats: '',
        pricePerSeat: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (e) => {
        setRideData({
            ...rideData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await rideService.offerRide(rideData);
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to offer ride');
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: isMobile ? 2 : 4, borderRadius: 2 }}>
                <Typography variant={isMobile ? "h5" : "h4"} gutterBottom align="center" sx={{ mb: 4 }}>
                    Offer a Ride
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="From"
                                name="source"
                                value={rideData.source}
                                onChange={handleChange}
                                required
                                size={isMobile ? "small" : "medium"}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="To"
                                name="destination"
                                value={rideData.destination}
                                onChange={handleChange}
                                required
                                size={isMobile ? "small" : "medium"}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Date"
                                name="date"
                                value={rideData.date}
                                onChange={handleChange}
                                required
                                InputLabelProps={{ shrink: true }}
                                size={isMobile ? "small" : "medium"}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="time"
                                label="Time"
                                name="time"
                                value={rideData.time}
                                onChange={handleChange}
                                required
                                InputLabelProps={{ shrink: true }}
                                size={isMobile ? "small" : "medium"}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Available Seats"
                                name="offerSeats"
                                type="number"
                                value={rideData.offerSeats}
                                onChange={handleChange}
                                required
                                inputProps={{ min: "1", max: "8" }}
                                size={isMobile ? "small" : "medium"}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Price per Seat"
                                name="pricePerSeat"
                                type="number"
                                value={rideData.pricePerSeat}
                                onChange={handleChange}
                                required
                                inputProps={{ min: "0" }}
                                size={isMobile ? "small" : "medium"}
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 4 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size={isMobile ? "large" : "medium"}
                            sx={{ py: isMobile ? 1.5 : 2, fontSize: isMobile ? '1rem' : '1.1rem' }}
                        >
                            Offer Ride
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default OfferRide;
