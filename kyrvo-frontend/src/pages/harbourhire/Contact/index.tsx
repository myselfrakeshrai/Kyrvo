import { Grid } from '@mui/material';
import React from 'react';
import ContactUs from 'src/components/Home/Contact/ContactUs';

const ContactPage : React.FC= () => {
  return (
    <Grid sx={{margin: '0 5%'}}>
        <ContactUs/>
    </Grid>
  );
};

export default ContactPage;
