import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// REDUX

// COMPONENTS
import CreateLocalOrderTab from '../../components/local-orders-tab/create-local-order/create-local-order.component';
import LocalOrders from '../../components/local-orders-tab/local-orders/local-orders.component';
import HeaderMenu, {
  SettingItem,
} from '../../components/header-menu/header-menu.component';

// STYLES
import { Title } from './local-orders.page.styles';
import { PageGrid } from '../../general.styles';

const LocalOrdersPage = () => {
  // ------------------------------- STATE AND CONSTANTS ----------------
  const [tab, setTab] = useState(
    sessionStorage.getItem('tab') || 'Crear orden'
  );

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  // --------------------------------- USE EFFECT ------------------

  useEffect(() => {
    sessionStorage.setItem('tab', tab);
  }, [tab]);

  // --------------------------------- HANDLERS ---------------------
  const renderSwitch = () => {
    switch (tab) {
      case 'Crear orden':
        return (
          <CreateLocalOrderTab
            variants={containerVariants}
            setTab={setTab}
            key={1}
          />
        );
      case 'En preparación':
        return (
          <LocalOrders variants={containerVariants} key={2} active={true} />
        );
      case 'Entregadas':
        return (
          <LocalOrders variants={containerVariants} key={3} active={false} />
        );
      default:
        return <CreateLocalOrderTab variants={containerVariants} key={1} />;
    }
  };

  return (
    <PageGrid
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <HeaderMenu Header={<Title>Ordenes locales</Title>} currentTab={tab}>
        <SettingItem tab="Crear orden" setTab={setTab} currentTab={tab}>
          Crear orden
        </SettingItem>
        <SettingItem tab="En preparación" setTab={setTab} currentTab={tab}>
          En preparación
        </SettingItem>
        <SettingItem tab="Por entregar" setTab={setTab} currentTab={tab}>
          Por entregar
        </SettingItem>
        <SettingItem tab="Entregadas" setTab={setTab} currentTab={tab}>
          Entregadas
        </SettingItem>
      </HeaderMenu>

      {/* -------------------------------- TAB CONTENT ---------------------- */}

      <AnimatePresence exitBeforeEnter>{renderSwitch()}</AnimatePresence>
    </PageGrid>
  );
};

export default LocalOrdersPage;
