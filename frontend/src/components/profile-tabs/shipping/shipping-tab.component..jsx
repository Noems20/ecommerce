import React from 'react';

// REDUX
import { useSelector } from 'react-redux';

// COMPONENTS
import ShippingCard from '../../shipping-card/shipping-card.component';
import EmptyShippingCard from '../../empty-shipping-card/empty-shipping-card.component';

// STYLES
import { Container, Content, ModifiedTitle } from './shipping-tab.styles';

const ShippingTab = ({ variants }) => {
  // -------------------------- STATE AND CONSTANTS ------------
  const addresses = useSelector((state) => state.addresses);

  // ------------------------ HANDLERS -------------------

  return (
    <Container
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <ModifiedTitle>Mis direcciones</ModifiedTitle>
      <Content>
        {addresses.map((address, index) => {
          return (
            <ShippingCard key={address._id} address={address} index={index} />
          );
        })}

        {addresses.length < 3 && <EmptyShippingCard index={addresses.length} />}
      </Content>
    </Container>
  );
};

export default ShippingTab;
