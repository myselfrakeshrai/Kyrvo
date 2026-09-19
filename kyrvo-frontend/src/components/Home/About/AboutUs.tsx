import React from 'react';
import { Typography, Grid, useTheme } from '@mui/material';
import { useAppStore } from 'src/stores';

const AboutUs: React.FC = () => {
  const themeInstance = useTheme();
  const { getVariable } = useAppStore();
  return (
    <Grid container spacing={2} mt={10}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h2" sx={{ fontSize: 30 }}>
          We offer customers a wide range of
        </Typography>
        <Typography
          variant="h2"
          sx={{ color: themeInstance.palette.primary.main, fontSize: 30 }}
        >
          commercial cars and Luxury Cars
        </Typography>
        <Typography variant="h2" sx={{ fontSize: 30 }}>
          for any occasion.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">{getVariable('AboutUsContent')}</Typography>
      </Grid>
    </Grid>
  );
};

export default AboutUs;
