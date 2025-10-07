import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import OfferRide from './pages/OfferRide';
import FindRide from './pages/FindRide';
import Profile from './pages/Profile';
import RideHistory from './pages/RideHistory';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated by verifying the session
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:8080/userProfile', {
          credentials: 'include' // Important for sending cookies
        });
        setIsAuthenticated(response.ok);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return isAuthenticated ? 
    children : 
    <Navigate to="/login" state={{ from: location }} replace />;
};

const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:8080/userProfile', {
          credentials: 'include'
        });
        setIsAuthenticated(response.ok);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return !isAuthenticated ? 
    children : 
    <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Navbar />
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/offer-ride"
              element={
                <PrivateRoute>
                  <Navbar />
                  <OfferRide />
                </PrivateRoute>
              }
            />
            <Route
              path="/find-ride"
              element={
                <PrivateRoute>
                  <Navbar />
                  <FindRide />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Navbar />
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/ride-history"
              element={
                <PrivateRoute>
                  <Navbar />
                  <RideHistory />
                </PrivateRoute>
              }
            />

            {/* Redirect root to dashboard or login */}
            <Route 
              path="/" 
              element={<Navigate to="/dashboard" replace />} 
            />

            {/* Catch all route */}
            <Route 
              path="*" 
              element={<Navigate to="/dashboard" replace />} 
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
