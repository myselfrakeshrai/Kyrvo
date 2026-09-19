import { Card, CardMedia, Container, Grid } from '@mui/material';
import React from 'react';
import Jumbotron from 'src/components/Jumbotron/Jumbotron';
import SectionHeader from 'src/components/SectionHeader/SectionHeader';
import { useAppStore } from 'src/stores';
import { tryParseJSON } from 'src/utils/helpers';
import './discover.css';

interface DiscoverProps {
  Title1: string;
  Image1: string;
  Title2: string;
  Image2: string;
  Title3: string;
  Image3: string;
}

const Discover: React.FC = () => {
  const { getVariable } = useAppStore();

  const DiscoverDataString = getVariable('Discover');
  const DiscoverData = tryParseJSON(DiscoverDataString);

  return (
    <Container maxWidth={'xl'}>
      <Grid container xs={12} spacing={1} className="ky-page-content" my={10}>
        {DiscoverData?.Discover?.map((discover: DiscoverProps) => (
          <Grid xs={12} md={6}>
            <Grid container spacing={1} xs={12} className="ky-discover-card">
              <Grid xs={8} sm={6}>
                <Card elevation={0}>
                  <CardMedia
                    component="img"
                    alt={discover.Title1}
                    image={discover.Image1}
                    className="ky-card-media-img-long"
                  />
                </Card>
              </Grid>
              <Grid xs={4} sm={6}>
                <Grid xs={12} sm={6}>
                  <Card elevation={0} className="card">
                    <CardMedia
                      component="img"
                      alt={discover.Title2}
                      image={discover.Image2}
                      className="ky-card-media-img-up"
                    />
                  </Card>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Card elevation={0} className="card">
                    <CardMedia
                      component="img"
                      alt={discover.Title3}
                      image={discover.Image3}
                      className="ky-card-media-img-long"
                    />
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid
          xs={12}
          md={6}
          className="ky-discover-card"
          sx={{ marginTop: { xs: '15px', md: '0px' } }}
        >
          <SectionHeader alignment="center" title="About Us" />
          <Jumbotron
            buttonCustomBackground="#000"
            contentAlignment="center"
            buttonCustomColor="#fff"
            desc={getVariable('AboutUs')}
            subtitle="Welcome to Mister Smoky"
            subtitleColor="#0f0f0f"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Discover;
