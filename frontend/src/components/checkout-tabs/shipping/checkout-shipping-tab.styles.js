import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Title } from '../../profile-tabs/tab-styles';

export const Container = styled(motion.div)`
  grid-column: full-start / full-end;
  margin: 3rem 4rem;

  @media only screen and (max-width: 400px) {
    margin: 4rem 0;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
  grid-gap: 2rem;
  grid-row-gap: 6rem;

  margin-bottom: 6rem;

  @media only screen and (max-width: 400px) {
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  }
`;

export const ModifiedTitle = styled(Title)`
  margin-bottom: 6rem;
  text-align: center;
`;
