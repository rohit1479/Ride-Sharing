import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
    handleMenuClose();
  };

  const menuItems = isAuthenticated ? (
    <>
      <MenuItem component={Link} to="/dashboard" onClick={handleMenuClose}>
        Dashboard
      </MenuItem>
      <MenuItem component={Link} to="/offer-ride" onClick={handleMenuClose}>
        Offer Ride
      </MenuItem>
      <MenuItem component={Link} to="/find-ride" onClick={handleMenuClose}>
        Find Ride
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        Logout
      </MenuItem>
    </>
  ) : (
    <>
      <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
        Login
      </MenuItem>
      <MenuItem component={Link} to="/register" onClick={handleMenuClose}>
        Register
      </MenuItem>
    </>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold'
          }}
        >
          Ride Sharing
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
              edge="end"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              keepMounted
            >
              {menuItems}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {!isAuthenticated ? (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/register"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/dashboard"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Dashboard
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/offer-ride"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Offer Ride
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/find-ride"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Find Ride
                </Button>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;