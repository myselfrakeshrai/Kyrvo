import React from 'react';
import { Typography, Box, useTheme } from '@mui/material';
import { useAppStore } from 'src/stores';

interface OpeningHoursObject {
  Day: string;
  Hours: string;
}

const OpeningHours: React.FC = () => {
  const { getVariable } = useAppStore();
  const theme = useTheme();

  const OpeningHoursData = getVariable('OpeningHours');

  if (!OpeningHoursData) {
    return null;
  }

  let OpeningHr = { OpeningHours: [] as OpeningHoursObject[] };
  try {
    OpeningHr = JSON.parse(OpeningHoursData);
  } catch (error) {
    console.error('Error parsing JSON data:', error);
    return null;
  }

  return (
    <section id="opening-hours">
      <Box
        sx={{
          backgroundColor: theme.palette.primary?.main,
          color: '#fff',
          padding: '20px',
          borderRadius: '10px',
          margin: '10px 20px',
          height: 'fit-content',
          boxShadow: '3px 3px 3px 3px rgba(0,0,0,0.3)',
          marginTop: { xs: '0px', md: '-75px' },
        }}
      >
        <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
          Opening Hours
        </Typography>
        {OpeningHr.OpeningHours.map(
          (openingHours: OpeningHoursObject, index: number) => (
            <Typography
              key={index}
              variant="body1"
              sx={{
                mb: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{openingHours.Day}&nbsp;&nbsp; : </span>

              <span>{openingHours.Hours}</span>
            </Typography>
          ),
        )}
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          Contact Number
        </Typography>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          +61 2 9586 0815
        </Typography>
      </Box>
    </section>
  );
};

export default OpeningHours;
