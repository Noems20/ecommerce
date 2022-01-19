import styled from 'styled-components';
import { HeroSection, HeroTitle } from '../../hero.styles';

// --------------------------------------------------------
// HERO
// --------------------------------------------------------

export const Hero = styled(HeroSection)`
  height: calc(70vh - 12rem);
  background: rgb(69, 104, 220);
  background: linear-gradient(90deg, #eb3349 0%, #f45c43 100%);

  @media only screen and (max-width: 1300px) {
    height: auto;
    grid-gap: 5rem;
    background: linear-gradient(180deg, #eb3349 0%, #f45c43 100%);
  }
`;

export const HeroTitleModified = styled(HeroTitle)`
  font-size: 11.5rem;

  @media only screen and (max-width: 600px) {
    font-size: 8rem;
  }
  @media only screen and (max-width: 400px) {
    font-size: 6.5rem;
  }
`;
