import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const errorColor = 'var(--color-red)';
const subColor = '#a1a6a4';

const shrinkLabelStyles = css`
  color: ${({ error }) =>
    error ? `${errorColor}` : 'var(--color-primary-light)'};
  top: -0.1rem;
  background-color: white;
`;

export const Container = styled(motion.div)`
  display: grid;
  grid-gap: 1rem;
`;

export const InputContainer = styled(motion.div)`
  position: relative;
  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;

export const Input = styled(motion.input)`
  font-family: inherit;
  font-size: inherit;
  color: var(--color-grey-dark-1);
  font-size: 1.6rem;
  font-weight: 400;
  background-color: white;
  padding: 1.5rem 1.7rem;
  border: ${({ error }) =>
    error ? `2px solid ${errorColor}` : `2px solid ${subColor}`};
  border-radius: 2px;

  -webkit-text-fill-color: var(--color-grey-dark-1);
  opacity: 1; /* required on iOS */

  display: block;
  width: 100%;

  &:focus {
    outline: none;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    box-shadow: 0 0 0 30px white inset !important;
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }

  &:focus-within {
    border: ${({ error }) =>
      error
        ? `2px solid ${errorColor}`
        : '2px solid var(--color-primary-light)'};
  }

  &:focus-within ~ label {
    ${shrinkLabelStyles}
  }

  &.active {
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

export const TextAreaInput = styled(motion.textarea)`
  font-family: inherit;
  font-size: inherit;
  resize: vertical;
  color: var(--color-grey-dark-1);
  font-size: 1.6rem;
  font-weight: 400;
  background-color: white;
  padding: 1.5rem 1.7rem;
  border: ${({ error }) =>
    error ? `2px solid ${errorColor}` : `2px solid ${subColor}`};
  border-radius: 2px;

  -webkit-text-fill-color: var(--color-grey-dark-1);

  /* overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none; */
  /* &::-webkit-scrollbar {
    display: none;
  } */

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
  }

  &:focus-within ~ label {
    ${shrinkLabelStyles}
  }

  &.active {
    border: ${({ error }) =>
      error
        ? `2px solid ${errorColor}`
        : '2px solid var(--color-primary-light)'};
  }

  @media only screen and (max-width: 1100px) {
    font-size: 1.7rem;
  }
`;

export const FormInputLabel = styled.label`
  font-size: 1.6rem;
  font-weight: 500;
  color: ${({ error }) => (error ? `${errorColor}` : `${subColor}`)};
  background-color: #fff;
  position: absolute;
  top: 50%;
  padding: 0 0.7rem;
  margin-left: 1.2rem;

  pointer-events: none;
  transform: translateY(-50%);
  transition: 300ms ease all;
  transition: top 0.3s ease;

  &.shrink {
    ${shrinkLabelStyles}
  }

  @media only screen and (max-width: 1100px) {
    font-size: 1.7rem;
  }
`;

export const ErrorText = styled.p`
  color: ${errorColor};
  font-size: 1.4rem;

  @media only screen and (max-width: 1100px) {
    font-size: 1.7rem;
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  display: flex;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  & svg {
    font-size: 2rem;
  }
`;
