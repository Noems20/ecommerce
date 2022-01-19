import styled from 'styled-components';
import tokens from './tokens';
import { Link } from 'react-router-dom';

const textColor = '#000';

// --------------------------------------------------------
// HERO
// --------------------------------------------------------

export const HeroSection = styled.div`
  grid-column: full-start / full-end;
  margin: 2rem 3rem;
  padding-left: 12rem;
  border-radius: 30px;
  height: calc(100vh - 12rem);
  overflow: hidden;

  background: rgb(255, 244, 236);
  background: linear-gradient(
    90deg,
    rgba(255, 244, 236, 1) 0%,
    rgba(252, 236, 220, 1) 25%,
    rgba(248, 220, 218, 1) 75%,
    rgba(246, 214, 220, 1) 100%
  );

  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: center;
  grid-template-rows: 100%;
  grid-template-columns: max-content 1fr;

  @media only screen and (max-width: 1300px) {
    background: rgb(255, 244, 236);
    background: linear-gradient(
      180deg,
      rgba(255, 244, 236, 1) 0%,
      rgba(252, 236, 220, 1) 25%,
      rgba(248, 220, 218, 1) 75%,
      rgba(246, 214, 220, 1) 100%
    );
    height: auto;
    grid-auto-flow: row;
    grid-template-rows: auto;
    grid-template-columns: 100%;
    padding: 4rem 0;
  }

  @media only screen and (max-width: 600px) {
    margin: 0;
    margin-bottom: 2rem;
    border-radius: 0;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media only screen and (max-width: 1300px) {
    align-items: center;
  }
`;

export const HeroTitle = styled.h1`
  font-family: ${tokens.fontDisplay};
  font-size: 13rem;
  font-weight: 700;

  color: ${textColor};

  @media only screen and (max-width: 500px) {
    font-size: 10rem;
  }
  @media only screen and (max-width: 360px) {
    font-size: 8rem;
  }
`;

export const HeroSubtitleUp = styled.h1`
  font-family: ${tokens.fontPrimary};
  font-weight: 400;
  margin-bottom: -1rem;

  color: ${textColor};

  @media only screen and (max-width: 1300px) {
    text-align: center;
    padding: 0 1rem;
    margin-bottom: 0;
  }
`;

export const HeroSubtitleDown = styled.h1`
  font-family: ${tokens.fontPrimary};
  font-size: 2.5rem;
  font-weight: 600;
  margin-top: 1rem;

  color: ${textColor};

  @media only screen and (max-width: 1300px) {
    text-align: center;
    padding: 0 1rem;
  }
`;

export const HeroButton = styled(Link)`
  text-decoration: none;
  font-family: ${tokens.fontPrimary};
  font-size: 1.8rem;
  font-weight: 600;
  color: #000;
  padding: 1.2rem 2rem;
  border-radius: 8px;
  border: none;
  background-color: rgba(193, 225, 255, 1);

  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(236, 236, 236, 1) 100%
  );

  margin-top: 6rem !important;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  cursor: pointer;

  @media only screen and (max-width: 1300px) {
    margin-top: 3rem;
  }
`;

export const RightColumn = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  @media only screen and (max-width: 1300px) {
    height: 45rem;
  }
`;

export const HeroImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;

  transform: translate(-50%, -45%);

  @media only screen and (min-width: 1850px) {
    width: 45%;
  }

  @media only screen and (max-width: 1300px) {
    transform: translate(-50%, -20%);
  }

  @media only screen and (max-width: 900px) {
    transform: translate(-50%, -25%);
    width: 370px;
  }

  @media only screen and (max-width: 500px) {
    width: 300px;
    transform: translate(-50%, -32%);
  }

  @media only screen and (max-width: 360px) {
    width: 280px;
  }
`;

export const Waves = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 85%;

  transform: translate(-50%, -50%);

  @media only screen and (min-width: 1850px) {
    width: 80%;
  }

  @media only screen and (max-width: 1300px) {
    transform: translate(-50%, -20%);
  }

  @media only screen and (max-width: 900px) {
    transform: translate(-50%, -25%);
    width: 650px;
  }

  @media only screen and (max-width: 500px) {
    width: 580px;
    transform: translate(-50%, -29%);
  }
`;
