import React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Card, CardContent, CardMedia, useTheme } from '@mui/material';
import {Luggage as LuggageIcon, People as PeopleIcon} from '@mui/icons-material';
import { formatCurrencyAUD, getImageUrl } from 'src/utils/helpers';
import { VehicleTypes } from 'src/models';

interface CarCardProps {
  vehicleType: VehicleTypes;
}

const CarCard: React.FC<CarCardProps> = ({ vehicleType }) => {
  const themeInstance = useTheme();
  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        borderRadius: '10px',
        height: '100px',
        background: 'transparent',
        boxShadow: `0px 0px 10px 0px #0000001a`,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(0.97)',
        },
        maxWidth: '50%',
        minWidth: '100%',
      }}
    >
      <CardMedia
        component="img"
        alt="Vehicle"
        height="100"
        image={getImageUrl(vehicleType.Image as string)}
        sx={{ width: { xs: '30%', sm: '100%' }, objectFit: 'contain' }}
      />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          background: `${themeInstance.palette.primary.main}12`,
          m: '5px',
          borderRadius: '10px',
        }}
      >
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography
            component="div"
            sx={{
              fontSize: '15px',
            }}
          >
            {vehicleType.Name}
          </Typography>
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: '900',
            }}
            color="text.secondary"
            component="div"
          >
            {formatCurrencyAUD(vehicleType.BasePrice)}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', padding: '5px' }}>
            <PeopleIcon />
            {vehicleType.Seats}
          </Box>
          <Box sx={{ display: 'flex', padding: '5px' }}>
            <LuggageIcon />
            {vehicleType.Luggages}
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default CarCard;
