import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { VehicleTypesServices } from 'src/services';
import { useAppStore } from 'src/stores';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  LinearProgress,
  Typography,
  useTheme,
} from '@mui/material';
import { VehicleTypes } from 'src/models';
import { useQuery } from '@tanstack/react-query';
import { Person, Luggage } from '@mui/icons-material';
import { formatCurrencyAUD, getImageUrl } from 'src/utils/helpers';
import { useNavigate } from 'react-router-dom';
import { SectionHeader } from '..';
const ShowVehiclesTypes: React.FC = () => {
  const { setVehicleTypes, setReservation, reservation } = useAppStore();
  const navigate = useNavigate();
  const { isLoading, data: vehiclesTypesData } = useQuery({
    queryKey: ['vehicle_types'],
    queryFn: () =>
      VehicleTypesServices.getAll().then((res) => {
        setVehicleTypes(res);
        return res;
      }),
  });

  const onBookClick = (vehicleType: VehicleTypes) => {
    setReservation({ ...reservation, VehicleType: vehicleType.Id });
    navigate('/booking');
  };

  const theme = useTheme();

  return (
    <Grid sx={{ margin: '0 5%' }}>
      <Grid sx={{ mt: 5, mb: 2 }}>
        <SectionHeader
          title="POPULAR DEALS"
          subtitle="Experience Amazing Deals with a Variety of Options."
          text="center"
          fontWeight={false}
          margin="auto"
        />
      </Grid>
      {isLoading && <LinearProgress />}
      <Grid
        container
        spacing={2}
        sx={{ mb: 5, padding: { xs: '0', sm: '0 10%', md: '0 10%' } }}
      >
        {vehiclesTypesData?.map((vehicleType: VehicleTypes) => (
          <Grid item xs={6} sm={6} md={4} lg={3} key={vehicleType.Id}>
            <Card
              elevation={0}
              sx={{
                borderRadius: '10px',
                background: 'transparent',
                boxShadow: `0px 0px 10px 0px ${theme.palette.primary.main}1a`,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <CardMedia
                component="img"
                alt="Vehicle"
                height="160"
                image={getImageUrl(vehicleType.Image as string)}
                sx={{ padding: '10px', objectFit: 'contain' }}
              />
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: '500' }}>
                  {vehicleType.Name}
                </Typography>
                <Grid
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box display={'flex'}>
                    <Person />
                    {vehicleType.Seats}
                  </Box>
                  <Box display={'flex'}>
                    <Luggage />
                    {vehicleType.Luggages}
                  </Box>
                </Grid>
                <Grid
                  sx={{
                    display: 'flex',
                    mb: 2,
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 1,
                      fontWeight: '400',
                    }}
                  >
                    Starting at
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 1,
                      fontWeight: '600',
                      color: theme.palette.primary.main,
                    }}
                  >
                    {formatCurrencyAUD(vehicleType.BasePrice)}
                  </Typography>
                </Grid>
                <Divider />
                <Button
                  sx={{
                    mt: 1,
                    width: '100%',
                  }}
                  variant="contained"
                  onClick={() => onBookClick(vehicleType)}
                >
                  Book
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ShowVehiclesTypes;
