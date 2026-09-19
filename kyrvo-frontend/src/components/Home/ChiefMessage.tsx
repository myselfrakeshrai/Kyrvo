import React from 'react';
import { Card, CardMedia, Grid, Typography } from '@mui/material';
import { useAppStore } from 'src/stores';
import { getImageUrl } from 'src/utils/helpers';
import { SectionHeader } from '..';

const ChiefMessage: React.FC = () => {
  const { getVariable } = useAppStore();
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={
        {
          // height: '100vh',
        }
      }
    >
      <Grid item sx={{ textAlign: 'center' }}>
        <SectionHeader
          title="MESSAGE FROM TEAMS"
          fontWeight={true}
          margin="auto"
          text="center"
        />
        <Card
          elevation={0}
          sx={{
            margin: { xs: '0 5%', sm: '0 5%', md: '0 15%', lg: '0 15%' },
            display: 'flex',
            flexWrap: { xd: 'wrap', sm: 'wrap', lg: 'nowrap', xs: 'wrap' },
            justifyContent: 'space-between',
            borderRadius: '20px',
            backgroundImage: 'linear-gradient(#f3f3f3, #ececec)',
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            alt="Vehicle"
            height="auto"
            image={getImageUrl(getVariable('ChiefPictures'))}
            sx={{
              width: { xs: '100%', sm: '50%' },
              objectFit: 'cover',
            }}
          />
          <Grid
            sx={{
              width: { xs: '100%', sm: '50%' },
              textAlign: 'left',
              p: 5,
            }}
          >
            <Typography variant="h2">Comfort, Reliability & Luxury</Typography>
            <Typography variant="body1">
              {getVariable('ChiefMessage')}
            </Typography>
            <Typography variant="body1">Harbour Hire Team</Typography>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChiefMessage;
