import { Grid } from '@mui/material';
import React from 'react';
import ContactInfo from 'src/pages/alnadwafts/Contact/components/ContactInfo';
import ContactTitle from 'src/pages/alnadwafts/Contact/components/ContactTitle';
import ContactForm from './components/ContactForm';
import PageComponent from 'src/components/Page/Page';
import './index.css';
import KyContentSection from 'src/components/KyContentSection';
import { useAppStore } from 'src/stores';
import GetInTouchData from 'src/models/GetInTouchData';

const ContactPage: React.FC = () => {
  const { getCollection } = useAppStore();
  const GetInTouchData = getCollection('GetInTouchPage') as GetInTouchData;
  return (
    <PageComponent isLoading={false} isAlert={false} severity="info" message="">
      <KyContentSection maxWidth="xl" py={5}>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          className="grid-container"
          mx={0}
          my={5}
        >
          <Grid
            container
            spacing={4}
            sm={12}
            className="contact-content-container"
            mx={0}
          >
            <ContactTitle
              title={GetInTouchData.Title}
              subtitle={GetInTouchData.Description}
            />
            <ContactInfo ContactInfo={GetInTouchData.ContactInfo} />
          </Grid>
          <Grid item xs={12} className="background-center-content">
            <ContactForm />
          </Grid>
        </Grid>
      </KyContentSection>
    </PageComponent>
  );
};

export default ContactPage;
