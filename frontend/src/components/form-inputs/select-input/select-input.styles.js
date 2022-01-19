import styled from 'styled-components';
import { RiArrowDownSLine } from 'react-icons/ri';

const errorColor = 'var(--color-red)';
const subColor = '#a1a6a4';

export const Container = styled.div`
  position: relative;
`;

export const Selector = styled.select`
  font-family: inherit;
  font-size: inherit;
  color: ${({ error }) => (error ? `${errorColor}` : `${subColor}`)};
  font-size: 1.6rem;
  font-weight: 400;
  background-color: white;
  padding: 1.5rem 1.7rem;
  border: ${({ error }) =>
    error ? `2px solid ${errorColor}` : `2px solid ${subColor}`};
  border-radius: 2px;

  /* -webkit-text-fill-color: var(--color-grey-dark-1); */
  -webkit-appearance: none;
  outline: none;

  display: block;
  width: 100%;

  &:focus {
    outline: none;
  }

  &:focus-within {
    border: ${({ error }) =>
      error
        ? `2px solid ${errorColor}`
        : '2px solid var(--color-primary-light)'};
    color: #000;

    & ~ label,
    & ~ svg {
      color: ${({ error }) =>
        error ? `${errorColor}` : `var(--color-primary)`};
    }
  }

  &.active {
    color: var(--color-grey-dark-1);
    border: ${({ error }) =>
      error
        ? `2px solid ${errorColor}`
        : '2px solid var(--color-primary-light)'};
  }

  &:disabled {
    border: 2px solid ${subColor};
    background-color: rgba(0, 0, 0, 0.05);
    cursor: not-allowed;

    & {
      color: ${subColor};
    }

    & ~ label {
      color: ${subColor};
      background-color: transparent;
      top: -0.9rem;
    }
  }

  @media only screen and (max-width: 1100px) {
    font-size: 1.7rem;
  }
`;

export const SelectLabel = styled.label`
  position: absolute;
  top: -0.1rem;
  font-family: inherit;
  font-size: 1.6rem;
  font-weight: 500;
  color: ${({ error }) => (error ? `${errorColor}` : `${subColor}`)};
  background-color: white;
  background-color: #fff;
  padding: 0 0.7rem;
  margin-left: 1.2rem;

  pointer-events: none;
  transform: translateY(-50%);
  transition: 300ms ease all;
  transition: top 0.3s ease;

  &.active {
    color: ${({ error }) => (error ? `${errorColor}` : 'var(--color-primary)')};
  }

  @media only screen and (max-width: 1100px) {
    font-size: 1.7rem;
  }
`;

export const Arrow = styled(RiArrowDownSLine)`
  color: ${({ error }) => (error ? `${errorColor}` : `${subColor}`)};
  position: absolute;
  top: 50%;
  right: 12px;
  width: 1.5rem;
  height: 1.5rem;
  transform: translateY(-50%);
  z-index: 1;

  &.active {
    color: ${({ error }) => (error ? `${errorColor}` : `var(--color-primary)`)};
  }

  @media only screen and (max-width: 430px) {
    height: 2.5rem;
    width: 2.5rem;
  }
`;
