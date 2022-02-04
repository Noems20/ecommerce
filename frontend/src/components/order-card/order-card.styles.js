import styled from 'styled-components';
import { motion } from 'framer-motion';
import background from '../shipping-card/cardBackground.jpg';

// ------------------------------------------------------------------------------------
// CARD STRUCTURE
// ------------------------------------------------------------------------------------
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
  /* padding: 2rem 4rem; */
`;

export const Body = styled.div`
  padding: 2rem 4rem;

  display: grid;
  grid-template-columns: 1fr;
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

export const SelectContainer = styled.div`
  margin: 2rem 0;

  display: grid;
  grid-auto-flow: column;
  grid-gap: 2rem;
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

// ------------------------------------------------------------------------------------
// PRODUCTS
// ------------------------------------------------------------------------------------

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
    margin-bottom: 0;
  }
`;

export const DetailsContainer = styled(motion.div)``;

// ------------------------------------------------------------------------------------
// ADDRESS
// ------------------------------------------------------------------------------------

export const AddressContainer = styled.div`
  margin: 2rem 4rem;
  margin-top: 0;

  display: grid;
  grid-gap: 2rem;

  @media only screen and (max-width: 500px) {
    margin: 2rem 0;
  }
`;

export const ShippingCard = styled.div`
  min-width: 40rem;
  border-radius: 8px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 0px 3px -1px;
  height: max-content;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease-in-out;

  display: grid;
  grid-template-rows: max-content max-content;

  &.selected {
    -webkit-box-shadow: 0px 7px 19px 0px rgba(0, 0, 0, 0.68);
    box-shadow: 0px 7px 19px 0px rgba(0, 0, 0, 0.68);

    transform: scale(1.01);
    transition: transform 0.3s ease, box-shadow 0.3s ease-in-out;
  }

  @media only screen and (max-width: 500px) {
    border-radius: 0;
  }

  @media only screen and (max-width: 400px) {
    min-width: 30rem;
  }
`;

export const CardMenu = styled.div`
  position: absolute;
  top: 0;
  right: 3%;

  transform: translateY(-50%);

  display: flex;

  @media only screen and (max-width: 400px) {
    right: 7%;
  }
`;

export const IconContainer = styled.div`
  background-color: ${({ edit }) =>
    edit === true ? '#196de3' : 'var(--color-red)'};
  border-radius: 100px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 0px 3px -1px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  & svg {
    font-size: 1.8rem;
    color: #fff;
  }

  @media only screen and (max-width: 1100px) {
    padding: 1rem;

    &:not(:last-child) {
      margin-right: 1.5rem;
    }

    & svg {
      font-size: 2.3rem;
    }
  }
`;

export const ShippingCardHeader = styled.div`
  color: #fff;
  padding: 2rem 0;
  border-radius: 8px 8px 0 0;
  background-image: linear-gradient(
      90deg,
      rgba(0, 83, 162, 0.8) 0%,
      rgba(0, 83, 162, 0.8) 50%,
      rgba(0, 83, 162, 0.8) 100%
    ),
    url(${background});
  background-size: cover;
  background-position: center;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 500px) {
    border-radius: 0;
  }
`;

export const State = styled.h1`
  font-size: 2.7rem;
`;
export const City = styled.h1`
  font-weight: 300;
`;

export const ShippingCardBody = styled.div`
  padding: 2rem;

  display: grid;
  grid-gap: 2rem;
`;

export const TwoColumns = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 1fr;
`;

export const ShippingInfoContainer = styled.div``;

export const InfoTitle = styled.h2`
  font-size: 1.8rem;
`;

export const Info = styled.p`
  font-size: 1.7rem;
`;

// ------------------------------------------------------------------------------------
// USER INFO
// ------------------------------------------------------------------------------------

export const UserInfoContainer = styled.div`
  margin: 2rem 4rem;
  margin-top: 0;

  display: grid;
  grid-gap: 2rem;
  justify-content: center;
  justify-items: center;
`;

export const UserInfo = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  grid-gap: 3rem;
`;

export const UserPhoto = styled.div`
  grid-row: 1 / 2;
  height: 15rem;
  width: 15rem;

  border-radius: 50%;
  border: 5px solid var(--color-primary);
  background-image: ${(props) => `url(${props.url})`};
  background-size: cover;
  background-position: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 8px 1px;

  @media only screen and (max-width: 500px) {
    height: 13rem;
    width: 13rem;
  }
`;

export const UserData = styled.div`
  display: grid;
  grid-gap: 1rem;
  height: max-content;
`;

export const UserText = styled.div`
  color: var(--color-primary);

  display: flex;
  align-items: center;
  column-gap: 1rem;

  & h1 {
    font-size: 3rem;

    @media only screen and (max-width: 500px) {
      font-size: 2.5rem;
    }
  }

  & p {
    font-size: 2rem;
    line-height: 1;
  }
  & svg {
    font-size: 2rem;
  }
`;

// ------------------------------------------------------------------------------------
// MODAL
// ------------------------------------------------------------------------------------

export const EditForm = styled.form`
  width: 50vw;
  max-height: 90vh;
  padding: 3rem;
  background-color: #fff;
  border-radius: 8px;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }

  display: grid;
  grid-gap: 2rem;

  @media only screen and (max-width: 1100px) {
    width: 70vw;
  }

  @media only screen and (max-width: 700px) {
    padding: 2rem;
    width: 90vw;
  }
`;

export const TwoColumnsModal = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 1fr;

  @media only screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const FormTitle = styled.h1`
  color: var(--color-primary);
`;
