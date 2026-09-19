import { useParams } from 'react-router-dom';
import React from 'react';
import { RideStatus } from 'src/components';
import { Container } from '@mui/material';

const BookingStatusPage: React.FC = () => {
  const { id } = useParams();
  return (
    <Container maxWidth="sm">
      <RideStatus id={id} />
    </Container>
  );
};

export default BookingStatusPage;
