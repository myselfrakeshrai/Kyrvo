import React from 'react';
import { Typography, Box } from '@mui/material';
import { useAppStore } from 'src/stores';
import { Phone as PhoneIcon, Email as EmailIcon } from '@mui/icons-material';

const ContactInfo: React.FC = () => {
  const { getVariable } = useAppStore();
  const ContactData = getVariable('ContactInfo');

  if (!ContactData) {
    return null;
  }

  let contactInfoObject;
  try {
    contactInfoObject = JSON.parse(ContactData).ContactInfo[0];
  } catch (error) {
    console.error('Error parsing JSON data:', error);
    return null;
  }

  return (
    <Box sx={{ mb: 1, display: 'flex' }}>
      <Typography
        variant="body1"
        sx={{ display: 'flex', alignItems: 'center', mr: 1 }}
      >
        <PhoneIcon sx={{ mr: 1 }} /> {contactInfoObject.phoneNumber}
      </Typography>
      <Typography
        variant="body1"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <EmailIcon sx={{ ml: 15 }} /> {contactInfoObject.email}
      </Typography>
    </Box>
  );
};

export default ContactInfo;
