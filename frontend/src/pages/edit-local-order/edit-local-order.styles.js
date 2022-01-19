import styled from 'styled-components';
import background from '../../background.jpg';
import tokens from '../../tokens';

// -----------------------------------------------------------
// HEADER
// -----------------------------------------------------------

export const UserDetailsContainer = styled.div`
  grid-column: full-start / full-end;
  height: 30rem;
  background-image: linear-gradient(
      90deg,
      rgba(0, 83, 162, 0.9) 0%,
      rgba(0, 83, 162, 0.9) 50%,
      rgba(0, 83, 162, 0.9) 100%
    ),
    url(${background});
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    height: auto;
  }
`;

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
