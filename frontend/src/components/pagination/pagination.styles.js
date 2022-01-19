import styled from 'styled-components';
import tokens from '../../tokens';

export const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2rem;
  height: max-content;
  width: max-content;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: ${tokens.fontPrimary};
  font-size: 1.8rem;
  font-weight: 600;
  color: #000;
  padding: 1.2rem 2rem;
  border-radius: 8px;
  border: none;
  background-color: rgba(193, 225, 255, 1);

  background: rgb(255, 255, 255);

  box-shadow: rgba(0, 0, 0, 0.35) 0px 1px 5px;

  cursor: pointer;

  transition: transform 0.4s ease, box-shadow 0.4s ease;

  & svg {
    font-size: 2rem;
    color: inherit;
  }

  &:hover {
    background: rgb(25, 103, 175);
    background: linear-gradient(
      180deg,
      rgba(25, 103, 175, 1) 0%,
      rgba(0, 83, 162, 1) 100%
    );
    color: #fff;
    transform: translateY(-2px);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 1px 10px;
  }

  @media only screen and (max-width: 400px) {
    padding: 1.2rem 1.6rem;
  }
`;
