import React from 'react';

// STYLES
import { Container, Input, Operator } from './quantity-input.styles';

const QuantityInput = ({
  handleChange,
  limit = 10,
  quantity,
  setQuantity = null,
  incHandler = null,
  decHandler = null,
  ...props
}) => {
  const dec = () => {
    if (quantity > 1) {
      if (setQuantity !== null) setQuantity(Number(quantity) - 1);
      if (decHandler !== null) {
        decHandler();
      }
    }
  };

  const inc = () => {
    if (quantity < limit) {
      if (setQuantity !== null) setQuantity(Number(quantity) + 1);
      if (incHandler !== null) {
        incHandler();
      }
    }
  };

  return (
    <Container>
      <Operator type='button' onClick={dec}>
        -
      </Operator>
      <Input onChange={handleChange} value={quantity} {...props} />
      <Operator type='button' onClick={inc}>
        +
      </Operator>
    </Container>
  );
};

export default QuantityInput;
