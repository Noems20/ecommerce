import React from 'react';

// Styles
import { Selector, SelectLabel, Container, Arrow } from './select-input.styles';

const SelectInput = ({ label, error, value, children, ...otherProps }) => {
  return (
    <Container>
      <Selector
        className={value.length ? 'active' : ''}
        defaultValue={value ? value : ''}
        {...otherProps}
        error={error ? 1 : 0}
      >
        {children}
      </Selector>
      <SelectLabel
        className={value.length ? 'active' : ''}
        error={error ? 1 : 0}
      >
        {label}
      </SelectLabel>
      <Arrow className={value.length ? 'active' : ''} error={error ? 1 : 0} />
    </Container>
  );
};

export default SelectInput;
