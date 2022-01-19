import styled from 'styled-components';

export const CardContent = styled.div`
  margin: 2rem;
  display: grid;
  grid-gap: 2rem;
  z-index: 3;
  position: relative;
  z-index: 1;
`;

export const BackgroundLogo = styled.img`
  position: absolute;
  top: 10%;
  left: 50%;
  width: 50%;
  border: none !important;
  opacity: 0.05;

  transform: translate(-50%, 0);

  z-index: 0 !important;
`;

export const CardTitle = styled.h1`
  color: var(--color-primary);

  @media only screen and (max-width: 1100px) {
    font-size: 2.2rem;
  }
`;

export const TwoColumns = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 1fr;

  @media only screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const TwoColumnsPayment = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-column-gap: 3rem;
  grid-template-columns: max-content max-content;
  justify-items: center;
  justify-content: center;

  & div {
    justify-items: center;
  }

  @media only screen and (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-gap: 2rem;
  }
`;

export const TwoColumnsTitle = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: max-content 1fr;
  align-items: center;
`;

export const ExpandButton = styled.div`
  justify-self: end;
  background-color: var(--color-primary);
  width: 30px;
  height: 30px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;

  & svg {
    color: currentcolor;
    font-size: 20px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-radius: 8px;
  border-collapse: collapse;
  overflow: hidden;
  & tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;
export const TableRow = styled.tr``;

export const TableHeading = styled.th`
  font-size: 1.6rem;
  font-weight: 600;
  color: #fff;
  text-align: center;
  vertical-align: middle;
  padding: 0 1rem;
  border: 1px solid #ddd;
  background-color: var(--color-primary);
  -webkit-print-color-adjust: exact;
  /* -moz-print-color-adjust: exact;
  -o-print-color-adjust: exact;
  -ms-print-color-adjust: exact; */
`;

export const TableData = styled.td`
  text-align: center;
  font-size: 1.6rem;
  padding: 0.5rem;
  border: 1px solid #ddd;

  @media only screen and (max-width: 380px) {
    padding: 0.5rem 0;
    width: min-content;
  }
`;

export const ItemContainer = styled.div`
  display: grid;
  height: max-content;
  grid-gap: 0.5rem;
`;

export const CardSubtitle = styled.h2`
  font-size: 1.7rem;
  @media only screen and (max-width: 1100px) {
    font-size: 1.95rem;
  }
`;

export const CardText = styled.p`
  font-size: 1.6rem;
  @media only screen and (max-width: 1100px) {
    font-size: 1.85rem;
  }
`;

export const ButtonsContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;

  @media only screen and (max-width: 400px) {
    grid-template-columns: none;
  }
`;
