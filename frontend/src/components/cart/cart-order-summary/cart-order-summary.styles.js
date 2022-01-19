import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 1px 5px;
  background-color: #fff;
  overflow: hidden;
  height: max-content;

  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 10rem;

  @media only screen and (max-width: 1300px) {
    position: static;
    max-width: 50rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  color: #fff;
  background-color: var(--color-primary);
  padding: 1rem 4rem;
`;

export const OrderInfo = styled.div`
  padding: 2rem;
  display: grid;
  grid-gap: 1rem;
`;

export const OrderInfoTitle = styled.h2`
  font-size: 1.8rem;
`;

export const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content max-content;
  grid-gap: 3rem;
  grid-row-gap: 1rem;
`;

export const ItemName = styled.p`
  font-size: 1.6rem;
`;
export const ItemQuantity = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
`;

export const ItemPrice = styled.h2`
  font-weight: 600;
  font-size: 1.8rem;
  justify-self: end;
`;

export const TotalContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 3rem;
  grid-row-gap: 1rem;
`;
