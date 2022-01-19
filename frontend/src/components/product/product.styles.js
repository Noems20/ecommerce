import styled from 'styled-components';
import tokens from '../../tokens';

// ------------------------------------------------------------
// PRODUCT INFO GRID
// ------------------------------------------------------------

export const ProductContainer = styled.div`
  grid-column: full-start/ full-end;
  margin: 3rem 4rem;
  margin-top: 5rem;

  display: grid;
  grid-gap: 3rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: max-content 1fr;

  @media only screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: max-content;
  }

  @media only screen and (max-width: 500px) {
    margin: 2rem 3rem;
  }
`;

// ------------------------------------------------------------
// PRODUCT INFO ITEMS
// ------------------------------------------------------------

export const ImageContainer = styled.div`
  padding: 3rem;
  border: 2px solid var(--color-grey-product);
  border-radius: 10px;
  max-height: 70rem;
  width: 50vw;

  display: grid;
  justify-content: center;
  justify-items: center;

  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);

  @media only screen and (max-width: 1000px) {
    grid-row: auto / auto;
    width: calc(100vw - 8rem);
  }

  @media only screen and (max-width: 500px) {
    padding: 2rem;
    width: calc(100vw - 6rem);
  }
`;

export const SecondaryImagesContainer = styled.div`
  grid-row: 2 / 3;
  display: grid;
  justify-items: center;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));

  & .active {
    /* transform: scale(1.1); */
    /* box-shadow: 0 0 5px #5e5e5e; */
    border: 2px solid var(--color-primary);
    padding: 1px;
    transition: all 0.2s ease;
  }

  @media only screen and (max-width: 1000px) {
    grid-row: auto / auto;
  }
`;

export const ProductImage = styled.img`
  max-width: 100%;
  max-height: 40rem;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }

  @media only screen and (max-width: 1000px) {
    max-height: 60rem;
  }
`;

export const InfoContainer = styled.div`
  grid-row: 1 / 3;

  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 3rem;
  align-content: start;

  @media only screen and (max-width: 1000px) {
    grid-row: 1 / 2;
  }
`;

// ------------------------------------------------------------
// PRODUCT INFO ITEMS
// ------------------------------------------------------------

export const ProductTitle = styled.h1`
  font-family: ${tokens.fontDisplay};
  font-size: 3rem;
  font-weight: 500;
  /* text-transform: uppercase; */
  color: var(--color-grey-product);
`;

export const ForTitle = styled.h1`
  font-weight: 500;
  text-transform: capitalize;
  color: var(--color-grey-product);
`;

export const ProductPrice = styled.div`
  font-size: 3rem;
  color: var(--color-grey-product);
  font-weight: 700;

  display: grid;

  & span {
    font-size: 1.6rem;
  }
`;

// ------------------------------------------------------------
// PRODUCT INFO DETAILS
// ------------------------------------------------------------

export const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
`;

export const DetailsTitle = styled.h1`
  font-size: 1.8rem;
  color: var(--color-grey-product);
  font-weight: 700;

  text-transform: uppercase;
`;

export const ColorItemsContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, 4rem);
`;

export const SizeItemsContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, 8rem);
`;

export const ColorDot = styled.span`
  height: 4rem;
  width: 4rem;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 1px 5px;
  cursor: pointer;

  position: relative;

  &::after {
    content: '';
    display: inline-block;

    position: absolute;
    top: 50%; /* position the top  edge of the element at the middle of the parent */
    left: 50%; /* position the left edge of the element at the middle of the parent */

    transform: translate(
      -50%,
      -50%
    ); /* This is a shorthand of translateX(-50%) and translateY(-50%) */

    height: 4rem;
    width: 4rem;
    background-color: ${({ color }) => color};
    border-radius: 50%;
    border: 2px solid #fff;
    cursor: pointer;
  }

  &:hover,
  &.selected {
    &::before {
      content: '';
      display: inline-block;

      position: absolute;
      top: 50%; /* position the top  edge of the element at the middle of the parent */
      left: 50%; /* position the left edge of the element at the middle of the parent */

      transform: translate(
        -50%,
        -50%
      ); /* This is a shorthand of translateX(-50%) and translateY(-50%) */

      height: 4.4rem;
      width: 4.4rem;
      background-color: var(--color-primary-light);
      border-radius: 50%;
    }
  }
`;

export const SizeItem = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-grey-product);
  padding: 1rem 3rem;
  border: 2px solid var(--color-primary-light);
  transition: all 0.2s ease;
  cursor: pointer;

  display: flex;
  justify-content: center;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;

  &.selected {
    background-color: var(--color-primary-light);
    color: #fff;
    transition: all 0.2s ease;
  }
`;

export const InfoTitle = styled.h2`
  letter-spacing: 1px;
  color: var(--color-grey-product);
  font-size: 1.8rem;
  font-weight: 700;
  text-transform: uppercase;

  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e2e1e1;
`;
export const Description = styled.div``;

export const DescriptionText = styled.p`
  font-size: 1.8rem;
  font-weight: 400;
  color: var(--color-grey-product);
  line-height: 1.6;
`;

export const List = styled.ul`
  /* list-style: none; */
`;

export const ListItem = styled.li`
  font-size: 1.8rem;
  font-weight: 300;
  color: var(--color-grey-product);
  line-height: 1.6;
  margin: 2rem 0;
  margin-left: 2rem;
`;
