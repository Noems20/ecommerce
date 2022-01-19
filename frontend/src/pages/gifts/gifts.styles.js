import styled from 'styled-components';
import { HeroSection } from '../../hero.styles';

// --------------------------------------------------------
// HERO
// --------------------------------------------------------

export const Hero = styled(HeroSection)`
  height: calc(70vh - 12rem);
  background: rgb(69, 104, 220);
  background: linear-gradient(
    90deg,
    rgba(69, 104, 220, 1) 0%,
    rgba(176, 106, 179, 1) 100%
  );

  @media only screen and (max-width: 1300px) {
    height: auto;
    grid-gap: 5rem;
    background: linear-gradient(
      180deg,
      rgba(69, 104, 220, 1) 0%,
      rgba(176, 106, 179, 1) 100%
    );
  }
`;
