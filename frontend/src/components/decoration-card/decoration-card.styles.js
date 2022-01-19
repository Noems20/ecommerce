import styled from 'styled-components';

// --------------------------------------------------------------
// Card
// --------------------------------------------------------------
export const Card = styled.div`
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 1px 5px;
  overflow: hidden;
  background-color: #fff;
  height: max-content;

  position: relative;
`;

// --------------------------------------------------------------
// DECORATION
// --------------------------------------------------------------
export const Decoration = styled.div`
  height: 2rem;
  width: 70%;
  background-color: ${({ color }) => color};
`;
