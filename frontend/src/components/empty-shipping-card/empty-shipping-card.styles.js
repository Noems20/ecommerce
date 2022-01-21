import styled from 'styled-components';

export const Card = styled.div`
  padding: 6rem;
  border-radius: 8px;
  border: 4px dashed #c7c7c7;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 400px) {
    margin: 0 2rem;
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
  font-size: 3.5rem;
  font-weight: 400;
  color: #565959;
  text-align: center;
  margin-bottom: 2rem;
`;

// ------------------------ MODAL -----------------------

export const EditForm = styled.form`
  width: 50vw;
  max-height: 90vh;
  padding: 3rem;
  background-color: #fff;
  border-radius: 8px;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }

  display: grid;
  grid-gap: 2rem;

  @media only screen and (max-width: 1100px) {
    width: 70vw;
  }

  @media only screen and (max-width: 700px) {
    padding: 2rem;
    width: 90vw;
  }
`;

export const TwoColumnsModal = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 1fr;

  @media only screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const FormTitle = styled.h1`
  color: var(--color-primary);
`;
