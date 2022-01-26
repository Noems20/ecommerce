import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// REDUX

// COMPONENTS
import CreateLocalOrderTab from '../../components/local-orders-tab/create-local-order/create-local-order.component';
import LocalOrders from '../../components/local-orders-tab/local-orders/local-orders.component';

// STYLES
import {
  UserDetailsContainer,
  Title,
  Settings,
  SettingsBar,
  CollapseItem,
  SettingItem,
} from './local-orders.page.styles';
import { PageGrid } from '../../general.styles';

// ICONS
import { FaCaretDown } from 'react-icons/fa';

const LocalOrdersPage = () => {
  // ------------------------------- STATE AND CONSTANTS ----------------
  const [tab, setTab] = useState(
    sessionStorage.getItem('tab') || 'Crear orden'
  );
  const [open, setOpen] = useState(false);

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const barVariants = {
    hidden: {
      height: 0,
      transition: {
        ease: 'easeInOut',
      },
    },
    visible: {
      height: 'auto',
      transition: {
        ease: 'easeInOut',
      },
    },
  };

  const barVariants2 = {
    hidden: {
      height: 'auto',
    },
    visible: {
      height: 'auto',
    },
  };

  // --------------------------------- USE EFFECT ------------------

  useEffect(() => {
    sessionStorage.setItem('tab', tab);
  }, [tab]);

  useEffect(() => {
    if (window.innerWidth > 500) {
      setOpen(true);
    } else {
      setOpen(false);
    }

    function handleResize() {
      if (window.innerWidth > 500) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      sessionStorage.removeItem('tab');
    };
  }, []);

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
      case 'Ordenes activas':
        return (
          <LocalOrders variants={containerVariants} key={2} active={true} />
        );
      case 'Historial de ordenes':
        return (
          <LocalOrders variants={containerVariants} key={3} active={false} />
        );
      default:
        return <CreateLocalOrderTab variants={containerVariants} key={1} />;
    }
  };

  const tabHandler = (tab) => {
    sessionStorage.removeItem('page');
    setTab(tab);
    sessionStorage.setItem('tab', tab);
  };

  return (
    <PageGrid
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* -------------------------------- HEADER ---------------------- */}
      <UserDetailsContainer>
        <Title>Ordenes locales</Title>
      </UserDetailsContainer>
      {/* -------------------------------- SETTINGS BAR ---------------------- */}
      <Settings>
        <CollapseItem onClick={() => setOpen(!open)}>
          {tab} <FaCaretDown />
        </CollapseItem>
        <AnimatePresence>
          {open && (
            <SettingsBar
              variants={window.innerWidth <= 500 ? barVariants : barVariants2}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <SettingItem
                onClick={() => tabHandler('Crear orden')}
                className={tab === 'Crear orden' ? 'active' : ''}
              >
                Crear orden
              </SettingItem>
              <SettingItem
                onClick={() => tabHandler('Ordenes activas')}
                className={tab === 'Ordenes activas' ? 'active' : ''}
              >
                Ordenes activas
              </SettingItem>
              <SettingItem
                onClick={() => tabHandler('Historial de ordenes')}
                className={tab === 'Historial de ordenes' ? 'active' : ''}
              >
                Historial de ordenes
              </SettingItem>
            </SettingsBar>
          )}
        </AnimatePresence>
      </Settings>
      {/* -------------------------------- TAB CONTENT ---------------------- */}

      {renderSwitch()}
    </PageGrid>
  );
};

export default LocalOrdersPage;
