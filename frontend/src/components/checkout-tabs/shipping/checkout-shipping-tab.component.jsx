import React, { useState, useEffect } from 'react';

// REDUX
import { useSelector } from 'react-redux';

// COMPONENTS
import ShippingCard from '../../shipping-card/shipping-card.component';
import EmptyShippingCard from '../../empty-shipping-card/empty-shipping-card.component';
import CustomButton from '../../custom-button/custom-button.component';

// STYLES
import {
  Container,
  ModifiedTitle,
  Content,
} from './checkout-shipping-tab.styles';

const CheckoutShippingTab = ({ variants, setTab }) => {
  // --------------------------- STATE AND CONSTANTS ----------
  const [selectedAddress, setSelectedAddress] = useState(0);

  const addresses = useSelector((state) => state.addresses);

  useEffect(() => {
    for (let idx in addresses) {
      if (addresses[idx].predetermined === true) {
        setSelectedAddress(Number(idx));
      }
    }
  }, [addresses]);

  return (
    <Container
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <ModifiedTitle>Dirección de envio</ModifiedTitle>
      <Content>
        {addresses.map((address, index) => {
          return (
            <ShippingCard
              key={address._id}
              address={address}
              index={index}
              selected={selectedAddress === index}
              select={true}
              setSelected={setSelectedAddress}
            />
          );
        })}

        {addresses.length < 3 && <EmptyShippingCard index={addresses.length} />}
      </Content>
      <CustomButton
        primary
        style={{ display: 'block', margin: '0 auto' }}
        onClick={() => setTab('order-resume')}
      >
        Continuar
      </CustomButton>
    </Container>
  );
};

export default CheckoutShippingTab;
