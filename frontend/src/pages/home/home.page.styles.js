import styled from 'styled-components';
import tokens from '../../tokens';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// const textColor = 'var(--color-primary)';

export const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr;

  grid-template-columns:
    [full-start] minmax(6rem, 1fr) [center-start] repeat(
      8,
      [col-start] minmax(min-content, 14rem) [col-end]
    )
    [center-end] minmax(6rem, 1fr) [full-end];
`;

// --------------------------------------------------------
// CATEGORIES
// --------------------------------------------------------

export const CategoriesBar = styled.div`
  grid-column: full-start / full-end;
  margin: 3rem;

  display: grid;
  grid-gap: 2rem;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  /* grid-template-columns: 1fr 1fr 1fr; */

  /* @media only screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  } */

  @media only screen and (max-width: 850px) {
    /* grid-template-rows: 1fr 1fr 1fr 1fr; */
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr;
  }
`;

export const BarItem = styled(Link)`
  height: 30rem;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.6);
  overflow: hidden;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  &.top {
    grid-column: 1 / 3;

    @media only screen and (max-width: 1000px) {
      grid-column: 1 / 3;
    }
    @media only screen and (max-width: 850px) {
      grid-column: 1 / 2;
    }
  }

  &:hover {
    & .background-image {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }
  }

  @media only screen and (max-width: 500px) {
    height: 20rem;
  }
`;

export const BarItemContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const BackgroundImageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
  z-index: -1;
`;

export const BarItemTitle = styled.h1`
  font-family: ${tokens.fontDisplay};
  font-size: 6rem;
  color: #fff;

  @media only screen and (max-width: 500px) {
    font-size: 4rem;
  }
`;

// --------------------------------------------------------
// BEST SELLER
// --------------------------------------------------------

export const ProductsContainer = styled.div`
  grid-column: full-start / full-end;
  margin: 3rem 4rem;

  display: grid;
  justify-items: center;
  grid-gap: 2rem;

  @media only screen and (max-width: 400px) {
    margin: 3rem;
  }
`;

export const SubTitle = styled.h1`
  font-family: ${tokens.fontPrimary};
  font-weight: 600;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: -1.5rem;
`;

export const Line = styled.div`
  width: 8rem;
  height: 2px;
  background-color: var(--color-primary);
`;

export const Title = styled.h1`
  font-family: ${tokens.fontPrimary};
  font-weight: 600;
  font-size: 3.5rem;
  text-align: center;
  margin-top: -2rem;
  /* text-transform: uppercase; */
`;

export const ButtonsContainer = styled.div`
  display: grid;
  justify-content: center;
  grid-auto-flow: column;
  grid-gap: 6rem;

  @media only screen and (max-width: 400px) {
    grid-gap: 2rem;
  }

  @media only screen and (max-width: 310px) {
    grid-auto-flow: row;
  }
`;

export const CatalogButton = styled.button`
  font-family: ${tokens.fontPrimary};
  font-size: 1.8rem;
  font-weight: 600;
  color: #000;
  padding: 1.2rem 2rem;
  border-radius: 8px;
  border: none;
  background-color: rgba(193, 225, 255, 1);

  background: rgb(255, 255, 255);

  box-shadow: rgba(0, 0, 0, 0.35) 0px 1px 5px;

  cursor: pointer;

  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &.active {
    background: rgb(25, 103, 175);
    background: linear-gradient(
      180deg,
      rgba(25, 103, 175, 1) 0%,
      rgba(0, 83, 162, 1) 100%
    );
    color: #fff;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 1px 10px;
  }
  &.active {
    transform: translateY(-2px);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 1px 10px;
  }

  @media only screen and (max-width: 400px) {
    padding: 1.2rem 1.6rem;
  }
`;

export const ProductsGrid = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
  grid-gap: 2rem;
  margin-top: 3rem;

  @media only screen and (max-width: 320px) {
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  }
`;

// --------------------------------------------------------
// SERVICE INFO
// --------------------------------------------------------

export const ServiceInfoContainer = styled.div`
  grid-column: full-start / full-end;
  margin: 3rem 0;
  padding: 5rem;
  background-color: rgba(68, 156, 244, 0.1);
  height: auto;

  display: grid;
  grid-gap: 2rem;
  justify-items: center;
  align-content: start;
`;

export const ServiceInfoContent = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-gap: 3rem;
  grid-auto-flow: column;
  justify-content: center;
  align-items: start;

  @media only screen and (max-width: 900px) {
    grid-auto-flow: row;
  }
`;

export const ServiceInfoItem = styled.div`
  display: grid;
  padding: 0 5rem;
  grid-gap: 2.5rem;
  justify-content: center;
  justify-items: center;

  @media only screen and (max-width: 900px) {
    grid-auto-flow: row;
    padding: 0 10rem;
  }
  @media only screen and (max-width: 550px) {
    padding: 0 5rem;
  }
  @media only screen and (max-width: 400px) {
    padding: 0;
  }
`;

export const ServiceInfoIconContainer = styled.div`
  border-radius: 8px;
  padding: 3.5rem;
  background: rgb(141, 201, 255);
  background: linear-gradient(
    180deg,
    rgba(141, 201, 255, 1) 0%,
    rgba(25, 103, 175, 1) 100%
  );

  display: flex;
  align-items: center;

  & svg {
    font-size: 3.5rem;
    color: #fff;
  }
`;

export const ServiceInfoTitle = styled.h1`
  font-family: ${tokens.fontDisplay};
  text-align: center;
`;
export const ServiceInfoText = styled.p`
  font-family: ${tokens.fontPrimary};
  font-size: 1.7rem;
  text-align: center;

  @media only screen and (max-width: 1100px) {
    font-size: 2rem;
  }
`;
