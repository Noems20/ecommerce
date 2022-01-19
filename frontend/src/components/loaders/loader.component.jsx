import React from 'react';

// STYLES
import { Spinner, SpinnerItem } from './loader.styles';

const Loader = ({ className }) => {
  return (
    <Spinner className={className}>
      <SpinnerItem />
      <SpinnerItem />
      <SpinnerItem />
      <SpinnerItem />
      <SpinnerItem />
    </Spinner>
  );
};

export default Loader;
