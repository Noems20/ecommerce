import styled from 'styled-components';
import tokens from '../../../tokens';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  margin-top: -8rem;

  display: grid;
  align-items: center;
  justify-items: center;
`;

export const Content = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-gap: 5rem;
`;

export const Text = styled.h2`
  text-align: center;
  font-family: ${tokens.fontDisplay};
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1.5px;

  background-color: #f9dbd6;
  color: var(--color-primary-dark);

  width: 100%;
  padding: 2rem 2rem;
`;
