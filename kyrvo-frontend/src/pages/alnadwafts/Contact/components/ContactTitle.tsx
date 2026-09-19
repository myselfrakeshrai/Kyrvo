import React from 'react';
import { Typography } from '@mui/material';
import './ContactTitle.css';

interface TitleProps {
  title: string;
  subtitle: string;
}

const ContactTitle: React.FC<TitleProps> = ({ title, subtitle }) => {
  return (
    <div className="contact-title">
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {subtitle}
      </Typography>
    </div>
  );
};

export default ContactTitle;
