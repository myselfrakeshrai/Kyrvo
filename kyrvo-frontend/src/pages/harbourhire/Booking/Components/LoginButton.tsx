import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook for navigation
import { useAppStore } from 'src/stores';

const LoginButton: React.FC = () => {
  const { user } = useAppStore();
  const theme = useTheme();
  const navigate = useNavigate(); // Get history object from React Router

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <Box
      sx={{
        padding: '10px',
        borderRadius: '5px',
        background: theme.palette.primary.main,
        mb: 2,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {user ? (
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 600,
            color: theme.palette.tertiary?.main,
          }}
        >
          Details of a person?
          <Typography
            sx={{
              fontSize: '10px',
              fontWeight: 100,
              color: theme.palette.tertiary?.main,
            }}
          >
            Information of a client details whom shall we received.
          </Typography>
        </Typography>
      ) : (
        <>
          <Typography
            sx={{
              fontSize: '15px',
              fontWeight: 600,
              color: theme.palette.tertiary?.main,
            }}
          >
            Are you a loyalty member?
            <Typography
              sx={{
                fontSize: '10px',
                fontWeight: 100,
                color: theme.palette.tertiary?.main,
              }}
            >
              Sign in to earn points and speed through the form below.
            </Typography>
          </Typography>
          <Button
            variant="outlined"
            sx={{
              color: theme.palette.tertiary?.main,
              borderColor: theme.palette.tertiary?.main,
              fontSize: '15px',
              fontWeight: 300,
            }}
            onClick={handleSignIn} // Call handleSignIn function on button click
          >
            Sign in
          </Button>
        </>
      )}
    </Box>
  );
};

export default LoginButton;
