import React from 'react';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../../../redux/orders/orders-actions';

// COMPONTENTS
import CartItemsContainer from '../../cart/cart-items-container/cart-items-container.component';
import CartItem from '../../cart/cart-item/cart-item.component';
import CartOrderSummary from '../../cart/cart-order-summary/cart-order-summary.component';
import ShippingCard from '../../shipping-card/shipping-card.component';
import CustomButton from '../../custom-button/custom-button.component';

// STYLES
import {
  Container,
  BackButton,
  ProductsResumeContainer,
  ModifiedTitle,
  AddressContainer,
  Subtitle,
  Line,
} from './order-resume-tab.styles';

// ICONS
import { FaArrowLeft } from 'react-icons/fa';

const OrderResumeTab = ({ variants, setTab, addresses, address }) => {
  // -------------------------- STATE AND CONSTANTS -------------
  const { cart, productsAmmount, totalPrice } = useSelector(
    (state) => state.cart
  );
  const { loading } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  // ---------------------- HANDLERS ----------------------
  const handleCreateOrder = () => {
    dispatch(createOrder());
  };

  return (
    <>
      <Container
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <BackButton onClick={() => setTab('shipping')}>
          <FaArrowLeft />
        </BackButton>
        <ModifiedTitle>Resumen de pedido</ModifiedTitle>
        <ProductsResumeContainer>
          <CartItemsContainer title="Tus productos">
            {cart.map((cartItem) => {
              return (
                <CartItem
                  cartProduct={cartItem}
                  key={cartItem._id}
                  disabled={true}
                />
              );
            })}
          </CartItemsContainer>
          <CartOrderSummary
            cart={cart}
            productsAmmount={productsAmmount}
            totalPrice={totalPrice}
            button={false}
          />
        </ProductsResumeContainer>
        <Subtitle>Dirección de envio</Subtitle>
        <Line />
      </Container>
      <AddressContainer>
        <ShippingCard
          address={addresses[address]}
          index={address}
          select={true}
          selected={true}
          disabled={true}
        />
        <CustomButton
          primary
          style={{ justifySelf: 'center' }}
          onClick={handleCreateOrder}
          disabled={loading.firstLoader}
          loading={loading.firstLoader}
        >
          Realiza tu pedido y paga
        </CustomButton>
      </AddressContainer>
    </>
  );
};

export default OrderResumeTab;
