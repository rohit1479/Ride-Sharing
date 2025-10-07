import { useState, useEffect } from 'react';
import { 
    Container, 
    Grid, 
    Paper, 
    Typography, 
    Button, 
    Box, 
    Card, 
    CardContent,
    CardActions,
    Avatar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import { 
    DirectionsCar, 
    Search, 
    Person, 
    History,
    Logout
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { rideService, userService } from '../services/api';

const Dashboard = () => {
    const [offeredRides, setOfferedRides] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        loadOfferedRides();
        fetchUserProfile();
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

    const fetchUserProfile = async () => {
        try {
            const response = await userService.getUserProfile();
            setUserProfile(response.data);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            if (error.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleLogout = async () => {
        try {
            await userService.logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const menuItems = [
        {
            text: 'Offer a Ride',
            icon: <DirectionsCar />,
            onClick: () => navigate('/offer-ride')
        },
        {
            text: 'Find a Ride',
            icon: <Search />,
            onClick: () => navigate('/find-ride')
        },
        {
            text: 'My Profile',
            icon: <Person />,
            onClick: () => navigate('/profile')
        },
        {
            text: 'Ride History',
            icon: <History />,
            onClick: () => navigate('/ride-history')
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* User Profile Card */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                            <Avatar 
                                sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main' }}
                            >
                                {userProfile?.name?.charAt(0) || 'U'}
                            </Avatar>
                            <Typography variant="h6" gutterBottom>
                                {userProfile?.name || 'Welcome'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {userProfile?.email || ''}
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <List>
                            {menuItems.map((item, index) => (
                                <ListItem 
                                    button 
                                    key={index}
                                    onClick={item.onClick}
                                    sx={{ borderRadius: 1, mb: 1 }}
                                >
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            ))}
                            <Divider sx={{ my: 1 }} />
                            <ListItem 
                                button 
                                onClick={handleLogout}
                                sx={{ borderRadius: 1, color: 'error.main' }}
                            >
                                <ListItemIcon>
                                    <Logout color="error" />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>

                {/* Offered Rides */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            My Offered Rides
                        </Typography>
                        {error && (
                            <Typography color="error" gutterBottom>
                                {error}
                            </Typography>
                        )}
                        <Grid container spacing={2}>
                            {offeredRides.map((ride, index) => (
                                <Grid item xs={12} sm={6} key={index}>
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
                                                Available Seats: {ride.seatsAvailable}
                                            </Typography>
                                            <Typography>
                                                Price per Seat: ₹{ride.pricePerSeat}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                            {offeredRides.length === 0 && (
                                <Grid item xs={12}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="body1" color="text.secondary" align="center">
                                                No rides offered yet.
                                            </Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => navigate('/offer-ride')}
                                                >
                                                    Offer a New Ride
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;