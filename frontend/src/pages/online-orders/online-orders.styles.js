import styled from 'styled-components';
import tokens from '../../tokens';

export const Title = styled.h1`
  font-family: ${tokens.fontDisplay};
  font-size: 8rem;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  padding: 4rem;

  @media only screen and (max-width: 350px) {
    padding: 4rem 2rem;
    font-size: 6rem;
  }
`;
