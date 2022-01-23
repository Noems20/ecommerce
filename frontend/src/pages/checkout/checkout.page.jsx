import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// REDUX
import { useSelector } from 'react-redux';

// COMPONENTS
import CheckoutShippingTab from '../../components/checkout-tabs/shipping/checkout-shipping-tab.component';
import OrderResumeTab from '../../components/checkout-tabs/order-resume/order-resume-tab.component';

// STYLES
import { PageGrid } from '../../general.styles';

const CheckoutPage = () => {
  // ----------------------- STATE AND CONSTANTS ---------------
  const [tab, setTab] = useState('shipping');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const addresses = useSelector((state) => state.addresses);

  const containerVariants2 = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  // ----------------------- USE EFFECT'S ------------
  useEffect(() => {
    if (selectedAddress === null) {
      for (let idx in addresses) {
        if (addresses[idx].predetermined === true) {
          setSelectedAddress(Number(idx));
        }
      }
    }
  }, [addresses, selectedAddress]);

  // ----------------------- HANDLERS --------------------
  const renderSwitch = () => {
    switch (tab) {
      case 'shipping':
        return (
          <CheckoutShippingTab
            key={1}
            variants={containerVariants2}
            setTab={setTab}
            setSelectedAddress={setSelectedAddress}
            selectedAddress={selectedAddress}
            addresses={addresses}
          />
        );
      case 'order-resume':
        return (
          <OrderResumeTab
            key={2}
            variants={containerVariants2}
            setTab={setTab}
            address={selectedAddress}
            addresses={addresses}
          />
        );
      default:
        return <CheckoutShippingTab key={1} />;
    }
  };
  return (
    <PageGrid>
      <AnimatePresence exitBeforeEnter>{renderSwitch(tab)}</AnimatePresence>
    </PageGrid>
  );
};

export default CheckoutPage;
