import { Divider, Grid } from '@mui/material';
import React from 'react';
import {
  CarCategory,
  Discover,
  //FooterNewsletter,
  //TrendsVisit,
  //Feedback,
  ChiefMessage,
  ShowVehiclesTypes,
  CarFeature,
} from 'src/components';

const HomePage: React.FC = () => {
  return (
    <>
      <Grid>
        <Divider />
      </Grid>
      <Grid maxWidth={'lg'} sx={{ m: '0px auto', mt: 10, mb: 5 }}>
        <Discover />
        {/*
    <TrendsVisit /> */}
        <CarCategory />
        <CarFeature />
        <ShowVehiclesTypes />
        <ChiefMessage />
        {/* <Feedback /> */}
        {/* <Divider /> */}
      </Grid>
    </>
  );
};

export default HomePage;
