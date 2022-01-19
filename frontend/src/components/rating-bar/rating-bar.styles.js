import styled from 'styled-components';

export const RatingNumber = styled.h2`
  cursor: pointer;
  &.onHover {
    color: var(--color-primary);
  }
`;

export const RatingPercentage = styled.div`
  width: 100%;
  border-radius: 4px;
  background-color: #f0f2f2;
  box-shadow: inset 0 0 0 1px #e3e6e6;
  transition: all 0.2s ease;
  overflow: hidden;
  cursor: pointer;

  &.onHover {
    color: red;
    background-color: rgba(25, 103, 175, 0.2);
    box-shadow: inset 0 0 0 1px var(--color-primary-dark);
    transition: all 0.2s ease;
  }

  &::before {
    content: ' ';
    display: block;
    width: ${({ percentage }) => percentage};
    height: 100%;
    box-shadow: inset 0 0 0 1px var(--color-primary-dark);
    background-color: var(--color-primary-light);
  }
`;

export const Percentage = styled.h2`
  cursor: pointer;
  &.onHover {
    color: var(--color-primary);
  }
`;
