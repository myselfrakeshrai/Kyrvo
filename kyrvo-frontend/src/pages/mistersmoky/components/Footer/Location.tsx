import React from 'react';
import { Typography, Box } from '@mui/material';
import { useAppStore } from 'src/stores';
import {LocationOn as LocationOnIcon} from '@mui/icons-material';

const Location: React.FC = () => {
  const { getVariable } = useAppStore();
  const LocationData = getVariable('Location');

  if (!LocationData) {
    return null;
  }

  let locationObject;
  try {
    locationObject = JSON.parse(LocationData).Location[0];
  } catch (error) {
    console.error('Error parsing JSON data:', error);
    return null;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <LocationOnIcon sx={{ marginRight: 1 }} />
        <Typography variant="body1">{locationObject.city}</Typography>
      </Box>
    </Box>
  );
};

export default Location;
