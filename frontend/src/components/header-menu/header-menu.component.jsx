import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// STYLES
import {
  Container,
  HeaderContainer,
  Settings,
  SettingsBar,
  SettingItemContent,
  CollapseItem,
} from './header-menu.styles';

// ICONS
import { FaCaretDown } from 'react-icons/fa';

export const SettingItem = ({ tab, setTab, currentTab, children }) => {
  // ---------------------------- HANDLERS -------------------------
  const tabHandler = (tab) => {
    sessionStorage.removeItem('page');
    setTab(tab);
    sessionStorage.setItem('tab', tab);
  };

  return (
    <SettingItemContent
      onClick={() => tabHandler(tab)}
      className={currentTab === tab ? 'active' : ''}
    >
      {children}
    </SettingItemContent>
  );
};

const HeaderMenu = ({ Header, currentTab, children }) => {
  // ------------------------- STATE AND CONSTANTS -----------------
  const [open, setOpen] = useState(false);

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

  // -------------------------- USE EFFECT ---------------------
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

  return (
    <Container>
      {/* -------------------------------- HEADER ---------------------- */}
      <HeaderContainer>{Header}</HeaderContainer>
      {/* -------------------------------- SETTINGS BAR ---------------------- */}
      <Settings>
        <CollapseItem onClick={() => setOpen(!open)}>
          {currentTab} <FaCaretDown />
        </CollapseItem>
        <AnimatePresence>
          {open && (
            <SettingsBar
              variants={window.innerWidth <= 500 ? barVariants : barVariants2}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {children}
            </SettingsBar>
          )}
        </AnimatePresence>
      </Settings>
    </Container>
  );
};

export default HeaderMenu;
