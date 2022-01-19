import React from 'react';

// STYLES
import {
  CustomButtonContainer,
  ChildrenContainer,
  ButtonLoader,
} from './custom-button.styles';

// ICONS

const CustomButton = ({ children, loading, className, ...props }) => {
  return (
    <CustomButtonContainer className={className} {...props}>
      <ChildrenContainer>
        {loading ? <ButtonLoader /> : children}
      </ChildrenContainer>
    </CustomButtonContainer>
  );
};

export default CustomButton;
