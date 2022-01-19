import React from 'react';
import { AnimatePresence } from 'framer-motion';

// COMPONENTS

//STYLES
import { Container } from './expand-item.styles';

const ExpandItem = ({ open, children, setOpen, reference }) => {
  const containerVariants = {
    hidden: {
      y: '-100vh',
      opacity: 0,
      transition: {
        type: 'spring',
        damping: 15,
        mass: 0.5,
      },
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 15,
        mass: 0.5,
      },
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <Container
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          exit='hidden'
          ref={reference}
        >
          {children}
        </Container>
      )}
    </AnimatePresence>
  );
};

export default ExpandItem;
