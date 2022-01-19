import styled from 'styled-components';
import { HeroSection, HeroSubtitleUp } from '../../hero.styles';
import { HeroImageResponsive } from '../../category-page.styles';

// --------------------------------------------------------
// HERO
// --------------------------------------------------------

export const Hero = styled(HeroSection)`
  height: calc(70vh - 12rem);

  background-color: #bf3a30;
  background-image: linear-gradient(315deg, #864ba2 0%, #bf3a30 74%);

  @media only screen and (max-width: 1300px) {
    padding-bottom: 0;
    height: auto;
    grid-gap: 5rem;
    background-color: #bf3a30;
    background-image: linear-gradient(180deg, #864ba2 0%, #bf3a30 74%);
  }
`;

export const HeroSubtitleUpModified = styled(HeroSubtitleUp)`
  font-size: 4rem;
`;

export const HeroImageResponsiveModified = styled(HeroImageResponsive)`
  max-height: 100%;
  max-width: 100%;

  @media only screen and (max-width: 1300px) {
    max-width: 50%;
  }
  @media only screen and (max-width: 600px) {
    max-width: 70%;
  }
`;
