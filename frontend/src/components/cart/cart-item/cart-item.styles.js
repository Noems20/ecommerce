import styled from 'styled-components';

export const Content = styled.div`
  height: 25rem;
  padding: 2rem;

  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 100%;

  @media only screen and (max-width: 700px) {
    height: auto;
    justify-items: center;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, max-content);
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 700px) {
    width: 40%;
    /* max-height: 90%; */
  }
  @media only screen and (max-width: 450px) {
    width: 60%;
    /* max-height: 90%; */
  }
`;
export const InfoContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-auto-rows: min-content;
`;

export const InfoSubContainer = styled.div`
  display: grid;
  grid-gap: 2rem;

  justify-items: start;
  @media only screen and (max-width: 700px) {
    grid-auto-flow: column;
  }
  @media only screen and (max-width: 380px) {
    grid-auto-flow: row;
    grid-template-columns: max-content max-content;
  }
`;

export const QuantityContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-auto-rows: min-content;
  align-items: start;
  justify-content: center;
  justify-items: center;
`;
export const PriceContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-auto-rows: min-content;
  align-items: start;
  justify-content: center;
  justify-items: end;

  @media only screen and (max-width: 700px) {
    justify-items: center;
  }
`;

export const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
`;
export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #000;
  text-decoration: none;

  @media only screen and (max-width: 700px) {
    text-align: center;
  }
`;
export const Price = styled.h1`
  font-weight: 400;
`;

// --------------------------------------------------------------
// COLOR
// --------------------------------------------------------------
export const Detail = styled.div`
  font-size: 1.6rem;
  text-transform: capitalize;

  display: grid;
  align-items: center;
  grid-auto-flow: column;
  grid-gap: 2rem;
`;

// --------------------------------------------------------------
// COLOR DOT
// --------------------------------------------------------------
export const ColorDot = styled.span`
  height: 3rem;
  width: 3rem;
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

    height: 3rem;
    width: 3rem;
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

      height: 3.4rem;
      width: 3.4rem;
      background-color: var(--color-primary-light);
      border-radius: 50%;
    }
  }
`;

// --------------------------------------------------------------
// SIZE ITEM
// --------------------------------------------------------------
export const SizeItem = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-grey-product);
  padding: 0.5rem 2rem;
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
    background-color: var(--color-primary);
    color: #fff;
    transition: all 0.2s ease;
  }
`;
