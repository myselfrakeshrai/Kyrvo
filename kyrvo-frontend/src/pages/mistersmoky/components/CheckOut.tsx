import React from 'react';
import { Button, Typography, Card } from '@mui/material';

interface CheckOutProps {
  totalCost: number;
}
const Checkout: React.FC<CheckOutProps> = ({ totalCost }) => {
  const handleCheckout = () => {};

  return (
    <Card
      style={{
        margin: 'auto',
        marginTop: '20px',
        padding: '20px',
        maxWidth: '500px',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Your Cart
      </Typography>
      <Typography variant="body1" gutterBottom>
        Total Cost: ${totalCost.toFixed(2)}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCheckout}>
        Checkout
      </Button>
    </Card>
  );
};

export default Checkout;
