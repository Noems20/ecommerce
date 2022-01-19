import styled from 'styled-components';
import { RightColumn, Waves } from './hero.styles';

// --------------------------------------------------------
// HERO
// --------------------------------------------------------

export const RightColumnResponsive = styled(RightColumn)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const HeroImageResponsive = styled.img`
  max-height: 90%;
  max-width: 90%;

  @media only screen and (max-width: 1300px) {
    max-height: 100%;
  }
`;

export const WavesResponsive = styled(Waves)`
  width: 85%;
  transform: translate(-50%, -50%);

  @media only screen and (max-width: 1300px) {
    transform: translate(-50%, -28%);
    width: 120%;
  }

  @media only screen and (max-width: 1100px) {
    transform: translate(-50%, -28%);
    width: 130%;
  }

  @media only screen and (max-width: 900px) {
    width: 150%;
  }

  @media only screen and (max-width: 500px) {
    transform: translate(-50%, -24%);
    width: 180%;
  }
`;

// --------------------------------------------------------
// PRODUCTS GRID
// --------------------------------------------------------

export const Products = styled.div`
  grid-column: full-start / full-end;
  margin: 2rem 3rem;

  display: grid;
  grid-gap: 5rem;
  grid-template-columns: max-content 1fr;

  @media only screen and (max-width: 1300px) {
    grid-template-rows: max-content max-content;
    grid-template-columns: 1fr;
  }
`;

export const FilterTitle = styled.h1`
  font-size: 1.6rem;
  color: var(--color-grey-product);
  font-weight: 700;

  text-transform: uppercase;
`;

// ------------------------------------
// FILTERS
// ------------------------------------

export const FiltersContainer = styled.div`
  padding: 2rem 3rem;
  height: max-content;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 1px 5px;
  background-color: #fff;

  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 10rem;

  display: grid;
  grid-gap: 2rem;

  @media only screen and (max-width: 1300px) {
    position: static;
    grid-gap: 5rem;
    grid-template-rows: max-content;
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media only screen and (max-width: 650px) {
    grid-gap: 2rem;
    grid-template-columns: 1fr;
  }
`;

export const Filter = styled.div`
  display: grid;
  grid-gap: 1rem;
`;

export const FilterItem = styled.div`
  font-size: 1.6rem;
  color: var(--color-grey-product);
  cursor: pointer;
  width: max-content;

  display: flex;
  align-items: center;

  &.selected,
  &:hover {
    color: var(--color-primary);
  }

  @media only screen and (max-width: 320px) {
    width: auto;
  }
`;

export const RadioButton = styled.div`
  height: 17px;
  width: 17px;
  margin-right: 1rem;
  border-radius: 50%;
  border: 2px solid var(--color-primary);
  background-color: #fff;

  &.selected {
    background-color: var(--color-primary);
  }
`;

// ------------------------------------
// PRODUCTS GRID
// ------------------------------------

export const ProductsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
  grid-gap: 2rem;

  @media only screen and (max-width: 320px) {
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  }
`;
