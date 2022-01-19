import styled from 'styled-components';

import { HeroSection, HeroImage } from '../../hero.styles';

// --------------------------------------------------------
// HERO
// --------------------------------------------------------

export const Hero = styled(HeroSection)`
  height: calc(70vh - 12rem);

  @media only screen and (max-width: 1300px) {
    height: auto;
  }
`;

export const HeroImageModified = styled(HeroImage)`
  transform: translate(-50%, -28%);

  @media only screen and (max-width: 1300px) {
    transform: translate(-50%, -20%);
  }

  @media only screen and (max-width: 900px) {
    transform: translate(-50%, -25%);
  }

  @media only screen and (max-width: 500px) {
    transform: translate(-50%, -32%);
  }
`;
