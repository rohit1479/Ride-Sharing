import { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { rideService } from '../services/api';

const FindRide = () => {
  const [searchParams, setSearchParams] = useState({
    source: '',
    destination: '',
    date: '',
  });
  const [rides, setRides] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await rideService.findRides(searchParams);
      setRides(response.data);
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to search rides');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Find a Ride
        </Typography>
        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSearch}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="From"
                name="source"
                value={searchParams.source}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="To"
                name="destination"
                value={searchParams.destination}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="date"
                name="date"
                value={searchParams.date}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Search Rides
          </Button>
        </form>
      </Paper>

      {rides.length > 0 && (
        <Grid container spacing={3}>
          {rides.map((ride) => (
            <Grid item xs={12} md={6} key={ride.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {ride.source} → {ride.destination}
                  </Typography>
                  <Typography color="textSecondary">
                    Date: {new Date(ride.date).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    Time: {ride.time}
                  </Typography>
                  <Typography>
                    Available Seats: {ride.offerSeats}
                  </Typography>
                  <Typography>
                    Price per Seat: ₹{ride.pricePerSeat}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Book Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FindRide;