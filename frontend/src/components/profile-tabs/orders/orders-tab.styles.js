import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Title } from '../tab-styles';

export const Container = styled(motion.div)`
  grid-column: center-start / center-end;
  margin: 4rem 0;

  @media only screen and (max-width: 700px) {
    grid-column: full-start / full-end;
    margin: 3rem 4rem;
  }

  @media only screen and (max-width: 400px) {
    margin: 3rem 0;
  }
`;

export const ModifiedTitle = styled(Title)`
  margin-bottom: 3rem;

  @media only screen and (max-width: 400px) {
    text-align: center;
    margin-bottom: 4rem;
  }
`;

export const OrdersContainer = styled.div`
  grid-column: 1 / -1;

  display: grid;
  grid-gap: 5rem;
`;
