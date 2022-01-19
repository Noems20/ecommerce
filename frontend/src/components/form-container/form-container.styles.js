import styled from 'styled-components';
import background from './background.jpg';

export const Container = styled.div`
  grid-column: full-start / full-end;
  height: auto;
  min-height: calc(100vh - 8rem);
  background-image: linear-gradient(
      90deg,
      rgba(0, 83, 162, 0.9) 0%,
      rgba(0, 83, 162, 0.9) 50%,
      rgba(0, 83, 162, 0.9) 100%
    ),
    url(${background});
  background-size: cover;
  background-position: center;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 650px) {
    min-height: calc(100vh - 13rem);
  }
`;
