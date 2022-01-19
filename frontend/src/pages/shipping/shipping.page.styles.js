import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr;

  grid-template-columns:
    [full-start] minmax(6rem, 1fr) [center-start] repeat(
      8,
      [col-start] minmax(min-content, 14rem) [col-end]
    )
    [center-end] minmax(6rem, 1fr) [full-end];
`;

export const FormContainer = styled.div`
  margin: 3rem 0;
  grid-column: col-start 3 / col-end 6;

  display: grid;
  grid-gap: 3rem;
  grid-template-columns: 1fr;
`;

export const Form = styled.form`
  display: grid;
  grid-gap: 2rem;
`;

export const FormTitle = styled.h1`
  text-transform: uppercase;
  font-weight: 300;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e1e1;
`;
