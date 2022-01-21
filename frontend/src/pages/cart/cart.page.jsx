import React from 'react';
import { useHistory } from 'react-router-dom';

// REDUX
import { useSelector } from 'react-redux';

// COMPONENTS
import CartItemsContainer from '../../components/cart/cart-items-container/cart-items-container.component';
import CartOrderSummary from '../../components/cart/cart-order-summary/cart-order-summary.component';
import ProductSuggestions from '../../components/product-suggestions/product-suggestions.component';
import CartItem from '../../components/cart/cart-item/cart-item.component';
import CustomButton from '../../components/custom-button/custom-button.component';

// STYLES
import { Container, EmptyTitle } from './cart.page.styles';
import { PageGrid } from '../../general.styles';

const Cart = () => {
  // ------------------------ STATE AND CONSTANTS -------------------
  const { cart, productsAmmount, totalPrice } = useSelector(
    (state) => state.cart
  );

  const { user } = useSelector((state) => state.user);
  const history = useHistory();

  // -------------------------- USE EFFECT'S ----------------------

  // ------------------------- HANDLERS ---------------------------

  const redirectHandler = () => {
    history.push('/login?redirect=carrito');
  };

  return (
    <PageGrid>
      <Container>
        <CartItemsContainer>
          {cart.length > 0 ? (
            cart.map((cartItem) => {
              return <CartItem cartProduct={cartItem} key={cartItem._id} />;
            })
          ) : (
            <>
              <EmptyTitle>
                Tu carrito de Copias Noé está vacío <br />
                <span style={{ fontSize: '7rem' }}>😥</span>
              </EmptyTitle>
              {!user && (
                <CustomButton
                  style={{ marginTop: '3rem', justifySelf: 'center' }}
                  onClick={redirectHandler}
                  primary
                >
                  Iniciar Sesión
                </CustomButton>
              )}
            </>
          )}
        </CartItemsContainer>
        <CartOrderSummary
          cart={cart}
          productsAmmount={productsAmmount}
          totalPrice={totalPrice}
        />
      </Container>
      <ProductSuggestions catalog="agendas" />
    </PageGrid>
  );
};

export default Cart;
