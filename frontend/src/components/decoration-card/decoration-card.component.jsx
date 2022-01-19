import React from 'react';

// STYLES
import { Card, Decoration } from './decoration-card.styles';

const DecorationCard = ({ children, color = 'var(--color-primary)' }) => {
  return (
    <Card>
      {children} <Decoration color={color} />
    </Card>
  );
};

export default DecorationCard;
