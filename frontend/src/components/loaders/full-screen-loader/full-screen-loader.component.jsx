import React from 'react';

// import AnimatedLogo from '../../../utils/logos/bigLogo/animated-logo';
import Logo from '../../../utils/logos/bigLogo/logo';

import { Container, LogoContainer } from './full-screen-loader.styles';

const FullScreenLoader = () => {
  const containerVariants = {
    hidden: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Container
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      <LogoContainer>
        <Logo />
      </LogoContainer>
    </Container>
  );
};

export default FullScreenLoader;
