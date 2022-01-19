import styled from 'styled-components';

export const Container = styled.div`
  grid-column: full-start / full-end;
  margin: 3rem;
  display: grid;
  grid-gap: 2rem;
`;

export const ProductSuggestionsTitle = styled.h1`
  color: var(--color-grey-product);
  font-size: 1.8rem;
  font-weight: 700;
  text-transform: uppercase;
`;

export const ProductsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
  grid-gap: 2rem;
  margin-top: 3rem;

  @media only screen and (max-width: 320px) {
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  }
`;
