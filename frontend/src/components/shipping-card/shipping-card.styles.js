import styled from 'styled-components';
import background from './cardBackground.jpg';

export const Card = styled.div`
  border-radius: 8px;
  padding-bottom: 7px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 0px 3px -1px;
  height: max-content;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease-in-out;

  display: grid;
  grid-template-rows: max-content max-content;

  &.selected {
    -webkit-box-shadow: 0px 7px 19px 0px rgba(36, 150, 255, 0.68);
    box-shadow: 0px 7px 19px 0px rgba(36, 150, 255, 0.68);

    transform: scale(1.01);
    transition: transform 0.3s ease, box-shadow 0.3s ease-in-out;
  }

  @media only screen and (max-width: 400px) {
    border-radius: 0px;
  }
`;

export const CardMenu = styled.div`
  position: absolute;
  top: 0;
  right: 3%;

  transform: translateY(-50%);

  display: flex;

  @media only screen and (max-width: 400px) {
    right: 7%;
  }
`;

export const IconContainer = styled.div`
  background-color: ${({ edit }) =>
    edit === true ? '#196de3' : 'var(--color-red)'};
  border-radius: 100px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 0px 3px -1px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  & svg {
    font-size: 1.8rem;
    color: #fff;
  }

  @media only screen and (max-width: 1100px) {
    padding: 1rem;

    &:not(:last-child) {
      margin-right: 1.5rem;
    }

    & svg {
      font-size: 2.3rem;
    }
  }
`;

export const CardHeader = styled.div`
  color: #fff;
  padding: 2rem 0;
  border-radius: 8px 8px 0 0;
  background-image: linear-gradient(
      90deg,
      rgba(0, 83, 162, 0.8) 0%,
      rgba(0, 83, 162, 0.8) 50%,
      rgba(0, 83, 162, 0.8) 100%
    ),
    url(${background});
  background-size: cover;
  background-position: center;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 400px) {
    border-radius: 0px;
  }
`;

export const State = styled.h1`
  font-size: 2.7rem;
`;
export const City = styled.h1`
  font-weight: 300;
`;

export const CardBody = styled.div`
  padding: 2rem;

  display: grid;
  grid-gap: 2rem;
`;

export const TwoColumns = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 1fr;
`;

export const InfoContainer = styled.div``;

export const InfoTitle = styled.h2`
  font-size: 1.8rem;
`;

export const Info = styled.p`
  font-size: 1.7rem;
`;

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

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);

  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
`;

export const Button = styled.button`
  font-family: inherit;
  font-size: 1.5rem;
  color: var(--color-primary);
  padding: 6px;
  background-color: #fff;
  border-radius: var(--border-radius);
  border: 1px solid var(--color-primary);
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-primary);
    color: #fff;
    font-weight: 500;
  }
`;
