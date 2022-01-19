import React from 'react';
import AnimatedBigLogo from '../../../utils/logos/bigLogo/animatedBigLogo';
import { Container, Content, Text } from './full-screen-message.styles';

const FullScreenMessage = ({ children }) => {
  return (
    <Container>
      <Content>
        <AnimatedBigLogo />
        <Text>{children}</Text>
      </Content>
    </Container>
  );
};

export default FullScreenMessage;
