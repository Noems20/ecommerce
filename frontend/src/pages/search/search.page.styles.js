import styled from 'styled-components';

export const Container = styled.div`
  margin: 3rem 4rem;
  grid-column: full-start / full-end;

  display: grid;
  grid-gap: 2rem;
`;

export const Title = styled.h1`
  font-size: 3rem;
  color: var(--color-grey-product);

  @media only screen and (max-width: 500px) {
    text-align: center;
  }
`;

export const NotFoundTitle = styled.h1`
  margin: 4rem 0;
  font-size: 4rem;
  color: var(--color-grey-product);
  text-align: center;
`;

export const ProductsContainer = styled.div`
  display: grid;
  grid-gap: 3rem;
  justify-items: center;
`;
