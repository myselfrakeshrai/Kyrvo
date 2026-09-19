import React from 'react';
import { CartProvider } from 'react-use-cart';
import CartItem from 'src/components/Cart/CartItem';

const CartPage: React.FC = () => {
  return (
    <div>
      <CartProvider>
        <CartItem />
      </CartProvider>
    </div>
  );
};

export default CartPage;
