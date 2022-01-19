import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  grid-column: full-start / full-end;
  margin: 4rem;

  @media only screen and (max-width: 400px) {
    margin: 4rem 0;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
  grid-gap: 2rem;

  @media only screen and (max-width: 720px) {
    grid-gap: 3.5rem;
  }

  @media only screen and (max-width: 400px) {
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  }
`;
