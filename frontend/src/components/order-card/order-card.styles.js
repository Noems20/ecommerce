import styled from 'styled-components';

export const Card = styled.div`
  border-radius: 20px;
  overflow: hidden;

  -webkit-box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  -moz-box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  -o-box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  @media only screen and (max-width: 400px) {
    border-radius: 0;
  }
`;

export const CardHeader = styled.div`
  padding: 1rem 4rem;
  background-color: var(--color-primary);

  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 550px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: max-content max-content;
    grid-row-gap: 2rem;
    justify-items: center;
    text-align: center;

    & div:last-child {
      grid-column: 1 / -1;
    }
  }
`;

export const CardHeaderInfo = styled.div``;

export const CardHeaderTitle = styled.h1`
  font-size: 2rem;
  color: #fff;
`;

export const CardHeaderText = styled.p`
  font-size: 1.7rem;
  color: #fff;
`;

export const CardBody = styled.div`
  padding: 2rem 4rem;

  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 2rem;

  @media only screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Column = styled.div``;

export const CardBodyTitle = styled.h1`
  color: var(--color-grey-product);
  font-size: 2.5rem;

  @media only screen and (max-width: 700px) {
    text-align: center;
  }
`;

export const CardBodyProducts = styled.div`
  margin-top: 2rem;

  display: grid;
  grid-gap: 2rem;
`;

export const ButtonsContainer = styled.div`
  height: max-content;

  display: grid;
  grid-gap: 2rem;
`;

// --------------------------------------------------------
// PRODUCTS
// --------------------------------------------------------

export const Content = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 22rem;

  @media only screen and (max-width: 700px) {
    height: auto;
    justify-items: center;
    grid-template-columns: 1fr;
    /* grid-template-rows: repeat(4, max-content); */
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
  grid-gap: 2rem;
  grid-auto-rows: min-content;
  align-items: start;
  justify-content: center;
  justify-items: center;
`;

export const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
export const Text = styled.h1`
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
  border: 2px solid var(--color-primary);
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

export const Line = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  grid-column: 1 / -1;
  height: 2px;
  background-color: var(--color-primary);

  @media only screen and (max-width: 700px) {
    grid-column: 1/ -2;
    margin-bottom: 0;
  }
`;
