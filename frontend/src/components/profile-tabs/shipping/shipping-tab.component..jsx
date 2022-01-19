import React from 'react';

// REDUX
import { useSelector } from 'react-redux';

// COMPONENTS
import ShippingCard from '../../shipping-card/shipping-card.component';
import EmptyShippingCard from '../../empty-shipping-card/empty-shipping-card.component';

// STYLES
import { Container, Content } from './shipping-tab.styles';
import { Title } from '../tab-styles';

const ShippingTab = ({ variants }) => {
  const addresses = useSelector((state) => state.addresses);

  return (
    <Container
      variants={variants}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      <Title style={{ marginBottom: '2rem' }}>Mis direcciones</Title>
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
