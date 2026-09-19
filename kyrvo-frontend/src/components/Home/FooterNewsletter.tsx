import { ArrowForward } from '@mui/icons-material';
import {
  Grid,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';

const FooterNewsletter: React.FC = () => {
  const themeInstance = useTheme();
  const isMobile = useMediaQuery(themeInstance.breakpoints.down('sm'));
  const isTablet = useMediaQuery(themeInstance.breakpoints.down('md'));
  return (
    <Grid
      item
      xs={6}
      sx={{
        margin: '0 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: -5,
      }}
    >
      <Typography
        variant="h2"
        component="p"
        sx={{
          fontSize: isMobile ? '15px' : isTablet ? '30px' : '50',
          marginTop: 5,
          fontWeight: '700',
        }}
      >
        Hello
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontSize: isMobile ? '10px' : isTablet ? '15px' : '20px',
          fontWeight: '500',
        }}
      >
        This is the day
      </Typography>
      <Button
        variant="contained"
        sx={{
          height: isMobile ? '30px' : '50px',
          width: isMobile ? '40%' : '15%',
          borderRadius: '50px',
          fontSize: isMobile ? '10px' : isTablet ? '15px' : '',
        }}
      >
        Subscribe
        <ArrowForward
          sx={{
            ml: 2,
          }}
        />
      </Button>
    </Grid>
  );
};

export default FooterNewsletter;
