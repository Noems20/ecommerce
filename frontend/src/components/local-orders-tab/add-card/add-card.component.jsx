import React from 'react';

// STYLES
import { Card, Add, AddText } from './add-card.styles';

// ICONS
import { BsPlusCircle } from 'react-icons/bs';

const AddCard = ({ handler }) => {
  return (
    <Card onClick={handler}>
      <Add>
        <AddText>Añadir producto</AddText>
        <BsPlusCircle />
      </Add>
    </Card>
  );
};

export default AddCard;
