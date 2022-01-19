import React from 'react';

// STYLES
import {
  Container,
  Title,
  Line,
  CartItems,
} from './cart-items-container.styles';

const CartItemsContainer = ({ children }) => {
  return (
    <Container>
      <Title>Tu Carrito</Title>
      <Line />
      <CartItems>{children}</CartItems>
    </Container>
  );
};

export default CartItemsContainer;
