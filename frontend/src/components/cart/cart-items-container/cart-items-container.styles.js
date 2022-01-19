import styled from 'styled-components';

export const Container = styled.div`
  min-width: 100%;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 300;
  text-transform: uppercase;
  line-height: 1;
`;

export const Line = styled.div`
  /* width: 100%; */
  margin: 2rem 0;
  height: 2px;
  background-color: var(--color-primary);
`;

export const CartItems = styled.div`
  display: grid;
  grid-gap: 2rem;
`;
