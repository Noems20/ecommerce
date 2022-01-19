import styled from 'styled-components';

export const Container = styled.div`
  /* height: 100%; */
  display: grid;
  align-items: end;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, max-content);
  grid-template-rows: 1fr;
`;

export const Icons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 5px;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & svg {
    color: ${(props) => (props.color ? props.color : 'white')};
    font-size: 2rem;
  }
`;
export const Text = styled.p`
  font-size: 1.6rem;
  font-weight: 700;

  line-height: 1;
  color: var(--color-grey-product);
`;
