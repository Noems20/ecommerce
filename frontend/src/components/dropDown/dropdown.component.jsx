import React from 'react';
import { AnimatePresence } from 'framer-motion';

// Styles
import {
  Container,
  Arrow,
  Items,
  DropDownItemContainer,
  IconContainer,
} from './dropdown.styles';

const containerVariants = {
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

const DropDown = ({ open, children }) => {
  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <Container
              variants={containerVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
            >
              <Items>{children}</Items>
            </Container>
            <Arrow
              variants={containerVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export const DropDownItem = ({ icon, children, ...props }) => {
  return (
    <DropDownItemContainer {...props}>
      {icon && <IconContainer>{icon}</IconContainer>}
      {children}
    </DropDownItemContainer>
  );
};

export default DropDown;
