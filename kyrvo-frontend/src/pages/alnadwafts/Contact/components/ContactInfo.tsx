import React from 'react';
import { Typography, Box } from '@mui/material';
import './ContactInfo.css';
import ContactData from 'src/models/AddressInfo';
import DynamicIcon from 'src/components/DynamicIcon';

interface ContactInfoProps {
  ContactInfo: ContactData[];
}
const ContactInfo: React.FC<ContactInfoProps> = ({ ContactInfo }) => {
  return (
    <div className="contact-info">
      {}
      {ContactInfo.map((contact) => (
        <Box className="contact-info-box">
          <>{<DynamicIcon name={contact.Address.Icon!} />}</>
          <Typography variant="body1" gutterBottom>
            {contact.Address.Title}
          </Typography>
        </Box>
      ))}
    </div>
  );
};

export default ContactInfo;
