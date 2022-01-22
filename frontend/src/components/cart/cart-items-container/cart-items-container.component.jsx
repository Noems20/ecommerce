import React from 'react';

// STYLES
import {
  Container,
  Title,
  Line,
  CartItems,
} from './cart-items-container.styles';

const CartItemsContainer = ({ children, title = 'Tu Carrito' }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Line />
      <CartItems>{children}</CartItems>
    </Container>
  );
};

export default CartItemsContainer;
