import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  grid-column: col-start 2 / col-end 7;
  margin: 4rem 0;
  border-radius: 3px;
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px; */
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 0px 3px -1px;

  @media only screen and (max-width: 900px) {
    grid-column: center-start / center-end;
  }

  @media only screen and (max-width: 515px) {
    grid-column: full-start / full-end;
  }
`;

export const Content = styled.div`
  padding: 3rem;

  @media only screen and (max-width: 415px) {
    padding: 3rem 2rem;
  }
`;

export const FormContainer = styled.form`
  display: grid;
  grid-gap: 3rem;
`;

export const ProductRow = styled.div`
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  align-items: center;

  & div:first-child {
    grid-column: 1 / 4;
  }

  @media only screen and (max-width: 400px) {
    grid-template-columns: auto;
    grid-template-rows: auto;
    & div:first-child {
      grid-column: auto / auto;
    }
  }
`;

export const ProductPrice = styled.h1`
  justify-self: center;
`;

export const ExtraRow = styled.div`
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: repeat(2, 1fr);

  @media only screen and (max-width: 550px) {
    grid-template-columns: none;
  }
`;
