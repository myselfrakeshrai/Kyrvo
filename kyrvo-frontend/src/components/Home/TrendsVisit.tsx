import {
  Typography,
  Grid,
  Card,
  CardMedia,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';

const TrendsVisit: React.FC = () => {
  const themeInstance = useTheme();
  const isMobile = useMediaQuery(themeInstance.breakpoints.down('sm'));


  return (
    <Grid sx={{ margin: '0 5%', mb: 5 }}>
      {/* About us Start*/}
          <Typography
            variant="h5"
            sx={{
              fontWeight: '700',
              fontSize: isMobile ? '20px' : '25px',
              mt: 3,
            }}
          >
           Renting Title
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 3,
            }}
          >
           Renting Subtitle
          </Typography>
          <Grid container spacing={isMobile ? 2 : 0}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                elevation={0}
                sx={{
                  margin: 1,
                  borderRadius: '10px',
                  background: 'transparent',
                  height: 400,
                }}
              >
                <CardMedia
                  component="img"
                  alt='place'
                  image={`${import.meta.env.VITE_STATIC_URL}${
                    'sdfasdfas'
                  }`}
                />
              </Card>
              <Grid>
                <Typography variant="body1" sx={{ ml: '10px' }}>
                'sdfasdfas'
                </Typography>
                <Typography variant="h5" sx={{ ml: '10px' }}>
                'sdfasdfas'
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* About us End */}
    </Grid>
  );
};

export default TrendsVisit;
