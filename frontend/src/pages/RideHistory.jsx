import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    Grid,
    Tabs,
    Tab,
    Card,
    CardContent,
    Box,
    Alert
} from '@mui/material';
import { rideService } from '../services/api';

const RideHistory = () => {
    const [tab, setTab] = useState(0);
    const [offeredRides, setOfferedRides] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        loadOfferedRides();
    }, []);

    const loadOfferedRides = async () => {
        try {
            const response = await rideService.getMyOfferedRides();
            setOfferedRides(response.data);
        } catch (error) {
            setError('Failed to load rides');
            console.error('Error loading rides:', error);
        }
    };

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Ride History
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs value={tab} onChange={handleTabChange} centered>
                        <Tab label="Offered Rides" />
                        <Tab label="Booked Rides" />
                    </Tabs>
                </Box>

                {tab === 0 && (
                    <Grid container spacing={2}>
                        {offeredRides.map((ride, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {ride.source} to {ride.destination}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            Date: {ride.date}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            Time: {ride.time}
                                        </Typography>
                                        <Typography>
                                            Seats Available: {ride.seatsAvailable}
                                        </Typography>
                                        <Typography>
                                            Price per Seat: ₹{ride.pricePerSeat}
                                        </Typography>
                                        <Typography sx={{ mt: 1 }} color={ride.status === 'COMPLETED' ? 'success.main' : 'info.main'}>
                                            Status: {ride.status || 'ACTIVE'}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                        {offeredRides.length === 0 && (
                            <Grid item xs={12}>
                                <Typography align="center" color="text.secondary">
                                    You haven't offered any rides yet.
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                )}

                {tab === 1 && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography align="center" color="text.secondary">
                                Booked rides history coming soon...
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            </Paper>
        </Container>
    );
};

export default RideHistory;