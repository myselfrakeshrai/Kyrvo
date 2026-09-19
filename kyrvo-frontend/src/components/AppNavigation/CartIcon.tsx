import React from 'react';
import { ShoppingCart } from '@mui/icons-material';
import { Badge, IconButton, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';

const CartAlert: React.FC = () => {
  const navigate = useNavigate();
   const { totalItems  } = useCart();
   const theme = useTheme();
  
  const handleCartClick = () => {
    navigate('/cart');
  };
  return (
    <IconButton
      size="large"
      aria-label="cart"
      color="primary"
      onClick={handleCartClick}
      sx={{ color: { xs: '#fff', sm: theme.palette.primary.main } }}
    >
      <Badge badgeContent={totalItems} color="secondary">
        <ShoppingCart />
      </Badge>
    </IconButton>
  );
};

export default CartAlert;
