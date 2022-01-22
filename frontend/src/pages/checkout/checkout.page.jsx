import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// REDUX

// COMPONENTS
import CheckoutShippingTab from '../../components/checkout-tabs/shipping/checkout-shipping-tab.component';
import OrderResumeTab from '../../components/checkout-tabs/order-resume/order-resume-tab.component';

// STYLES
import { PageGrid } from '../../general.styles';

const CheckoutPage = () => {
  // ----------------------- STATE AND CONSTANTS ---------------
  const [tab, setTab] = useState('shipping');

  const containerVariants = {
    hidden: {
      x: '-100vw',
      transition: {
        type: 'tween',
      },
    },
    visible: {
      x: 0,
      transition: {
        type: 'tween',
      },
    },
    exit: {
      x: '100vw',
      transition: {
        type: 'tween',
      },
    },
  };

  const containerVariants2 = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exit: {
      x: '100vw',
      transition: {
        type: 'tween',
      },
    },
  };

  // ----------------------- HANDLERS --------------------
  const renderSwitch = () => {
    switch (tab) {
      case 'shipping':
        return (
          <CheckoutShippingTab
            key={1}
            variants={containerVariants2}
            setTab={setTab}
          />
        );
      case 'order-resume':
        return (
          <OrderResumeTab
            key={2}
            variants={containerVariants}
            setTab={setTab}
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
