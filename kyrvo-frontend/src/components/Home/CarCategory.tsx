import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { VehicleTypesServices } from 'src/services';
import { useAppStore } from 'src/stores';
import {
  Card,
  CardMedia,
  Chip,
  Grid,
  LinearProgress,
  useTheme,
} from '@mui/material';
import { VehicleTypes } from 'src/models';
import { useQuery } from '@tanstack/react-query';

const CarCategory: React.FC = () => {
  // Slick settings
  const slickSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    slickNext: true,
    slickPrevious: true,
    swipe: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const { setVehicleTypes } = useAppStore();

  const { isLoading, data: vehiclesTypesData } = useQuery({
    queryKey: ['vehicle_types'],
    queryFn: () =>
      VehicleTypesServices.getAll().then((res) => {
        setVehicleTypes(res);
        return res;
      }),
  });
  const theme = useTheme();
  return (
    <Grid
      sx={{
        margin: '5% 5%',
      }}
    >
      {isLoading && <LinearProgress />}
      <Slider {...slickSettings}>
        {vehiclesTypesData?.map((vehicleType: VehicleTypes) => (
          <Grid sx={{ padding: 1 }} key={vehicleType.Id}>
            <Grid
              sx={{
                padding: '30px 20px',
                zIndex: '0',
                borderRadius: '20px',
                backgroundImage: 'linear-gradient(#f3f3f3, #ececec)',
              }}
            >
              <Card
                elevation={0}
                key={vehicleType.Id}
                sx={{
                  maxWidth: 250,
                  background: 'transparent',
                }}
              >
                <Chip
                  label={vehicleType.Name}
                  variant="outlined"
                  sx={{
                    position: 'absolute',
                    mt: -3,
                    ml: -1.6,
                    border: `1px solid ${theme.palette.primary.main}`,
                    height: '20px',
                    color: theme.palette.primary.main,
                  }}
                />
                <CardMedia
                  component="img"
                  alt="Vehicle"
                  height="120"
                  image={`${import.meta.env.VITE_STATIC_URL}${
                    vehicleType.Image
                  }`}
                  sx={{ objectFit: 'contain' }}
                />
              </Card>
            </Grid>
          </Grid>
        ))}
      </Slider>
    </Grid>
  );
};

export default CarCategory;
