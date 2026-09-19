import { Grid } from '@mui/material';
import React from 'react';
import AboutUs from 'src/components/Home/About/AboutUs';

const AboutPage : React.FC= () => {
  return (
    <Grid sx={{margin: '0 5%'}}>
        <AboutUs/>
    </Grid>
  );
};

export default AboutPage;
