import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// COMPONENTS
import HeaderMenu, {
  SettingItem,
} from '../../components/header-menu/header-menu.component';
import OrdersTab from '../../components/profile-tabs/orders/orders-tab.component';

// STYLES
import { Title } from './online-orders.styles';
import { PageGrid } from '../../general.styles';

const OnlineOrdersPage = () => {
  // ----------------------- STATE AND CONSTANTS ----------------
  const [tab, setTab] = useState(sessionStorage.getItem('tab') || 'Recibidos');

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const renderSwitch = () => {
    switch (tab) {
      case 'Recibidos':
        return (
          <OrdersTab
            variants={containerVariants}
            status={'Recibidos'}
            admin={true}
            title="Recibidos"
            key={1}
          />
        );
      case 'En preparación':
        return (
          <OrdersTab
            variants={containerVariants}
            status={'En preparación'}
            admin={true}
            title="En preparación"
            key={2}
          />
        );
      case 'Para entregar':
        return (
          <OrdersTab
            variants={containerVariants}
            status={'Para entregar'}
            admin={true}
            title="Para entregar"
            key={3}
          />
        );
      case 'En camino':
        return (
          <OrdersTab
            variants={containerVariants}
            status={'En camino'}
            admin={true}
            title="En camino"
            key={4}
          />
        );
      case 'Entregados':
        return (
          <OrdersTab
            variants={containerVariants}
            status={'Entregados'}
            admin={true}
            title="Entregados"
            key={5}
          />
        );
      default:
        return (
          <OrdersTab
            variants={containerVariants}
            status={'Recibidos'}
            admin={true}
            title="Recibidos"
            key={1}
          />
        );
    }
  };
  return (
    <PageGrid>
      <HeaderMenu Header={<Title>Pedidos online</Title>} currentTab={tab}>
        <SettingItem tab="Recibidos" currentTab={tab} setTab={setTab}>
          Recibidos
        </SettingItem>
        <SettingItem tab="En preparación" currentTab={tab} setTab={setTab}>
          En preparación
        </SettingItem>
        <SettingItem tab="Para entregar" currentTab={tab} setTab={setTab}>
          Para entregar
        </SettingItem>
        <SettingItem tab="En camino" currentTab={tab} setTab={setTab}>
          En camino
        </SettingItem>
        <SettingItem tab="Entregados" currentTab={tab} setTab={setTab}>
          Entregados
        </SettingItem>
      </HeaderMenu>
      <AnimatePresence exitBeforeEnter>{renderSwitch()}</AnimatePresence>
    </PageGrid>
  );
};

export default OnlineOrdersPage;
