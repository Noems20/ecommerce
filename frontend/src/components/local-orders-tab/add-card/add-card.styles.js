import styled from 'styled-components';

export const Card = styled.div`
  padding: 3rem;
  border-radius: 8px;
  border: 4px dashed #c7c7c7;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 400px) {
    border-radius: 0px;
  }
`;

export const Add = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & svg {
    font-size: 7rem;
    color: #c7c7c7;
  }
`;

export const AddText = styled.h1`
  font-size: 3rem;
  font-weight: 400;
  color: #565959;
  text-align: center;
  margin-bottom: 2rem;
`;
