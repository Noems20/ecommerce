import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Title } from '../../profile-tabs/tab-styles';

export const Container = styled(motion.div)`
  grid-column: full-start / full-end;
  margin: 3rem 4rem;

  @media only screen and (max-width: 360px) {
    margin: 3rem;
  }

  @media only screen and (max-width: 300px) {
    margin: 3rem 2rem;
  }
`;

export const ProductsResumeContainer = styled.div`
  display: grid;
  grid-gap: 6rem;
  grid-template-columns: 1fr 0.4fr;

  @media only screen and (max-width: 1300px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

export const BackButton = styled.button`
  color: #fff;
  height: 5rem;
  width: 5rem;
  border: none;
  border-radius: 50%;
  background-color: var(--color-primary);
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    color: #fff;
    font-size: 3rem;
  }
`;

export const ModifiedTitle = styled(Title)`
  margin-bottom: 3rem;
  text-align: center;

  @media only screen and (max-width: 500px) {
    margin-top: 4rem;
  }
`;

export const AddressContainer = styled.div`
  grid-column: full-start / full-end;

  display: grid;
  grid-gap: 5rem;
  justify-content: center;
`;

export const Subtitle = styled.h1`
  margin-top: 5rem;
  font-size: 2.5rem;
  font-weight: 300;
  text-transform: uppercase;
  line-height: 1;
`;

export const Line = styled.div`
  /* width: 100%; */
  margin: 2rem 0;
  margin-bottom: 3rem;
  height: 2px;
  background-color: var(--color-primary);
`;
