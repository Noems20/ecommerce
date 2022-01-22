import React from 'react';

// STYLES
import { Container } from './order-resume-tab.styles';

const OrderResumeTab = ({ variants, setTab }) => {
  return (
    <Container
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1>Resumen de orden</h1>
      <button onClick={() => setTab('shipping')}>Regresar</button>
    </Container>
  );
};

export default OrderResumeTab;
