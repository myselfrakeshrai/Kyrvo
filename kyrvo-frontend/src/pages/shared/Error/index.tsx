import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error') || '404';
  const message = searchParams.get('message') || 'Page not found';
  return (
    <Grid
      xs={12}
      sx={{
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid>
        <Box
          component={'img'}
          sx={{
            mt: 20,
            width: 250,
            maxWidth: { xs: 100, md: 150 },
          }}
          alt="404 png"
          src="https://www.freeiconspng.com/uploads/warning-icon-attention-caution-23.png"
        />
        <Typography
          sx={{
            fontSize: 30,
            mt: 5,
            fontWeight: '500',
            color: theme.palette.error.main,
            textTransform: 'capitalize',
          }}
        >
          {message}
        </Typography>
        {error !== '404' && (
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: '100',
              color: theme.palette.primary.main,
            }}
          >
            For assistance with this error, please contact your system
            administrator.
          </Typography>
        )}
        <Button
          color="primary"
          onClick={() => navigate(-1)}
          size="large"
          sx={{ mt: 5 }}
          variant="contained"
          startIcon={<ArrowBack />}
        >
          Go Back
        </Button>
      </Grid>
    </Grid>
  );
};
export default ErrorPage;
