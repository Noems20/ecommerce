import styled from 'styled-components';

// const marginRightLeft = '4rem';
// const marginTopBottom = '3rem';

// -----------------------------------------------------------
// HEADER
// -----------------------------------------------------------

export const UserDetails = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  align-items: center;
  grid-gap: 5rem;

  @media only screen and (max-width: 600px) {
    padding: 3rem 0;
    justify-items: center;
    grid-gap: 1rem;
    grid-template-columns: 1fr;
    grid-template-rows: min-content min-content;
  }
`;

export const UserImageContainer = styled.div`
  position: relative;
`;

export const UserImage = styled.div`
  height: 24rem;
  width: 24rem;

  border-radius: 50%;
  border: 5px solid var(--color-primary-light);
  background-image: ${(props) => `url(${props.url})`};
  background-size: cover;
  background-position: center;
  box-shadow: 0px 0px 8px 1px var(--color-grey-dark-1);
  -webkit-box-shadow: 0px 0px 8px 1px var(--color-grey-dark-1);
  -moz-box-shadow: 0px 0px 8px 1px var(--color-grey-dark-1);

  @media only screen and (max-width: 600px) {
    height: 20rem;
    width: 20rem;
  }
`;

export const ImageInput = styled.input`
  display: none;
`;

export const ImageInputLabel = styled.label`
  position: absolute;
  top: 70%;
  right: 2%;
  color: ${({ error }) =>
    error ? 'var(--color-red)' : 'var(--color-primary)'};
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    font-size: 2.5rem;
  }
`;

export const UserInfo = styled.div``;

export const UserName = styled.div`
  font-weight: 300;
  font-size: 3rem;
  color: #fff;

  @media only screen and (max-width: 600px) {
    text-align: center;
  }
`;

export const Info = styled.div`
  font-size: 2rem;
  font-weight: 200;
  color: #fff;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  display: flex;
  align-items: center;

  & svg {
    margin-right: 2rem;
  }

  @media only screen and (max-width: 600px) {
    justify-content: center;
    & svg {
      margin-right: 1rem;
    }
  }
`;

// -----------------------------------------------------------
// SETTINGS BAR
// -----------------------------------------------------------

// -----------------------------------------------------------
// TAB CONTENT
// -----------------------------------------------------------
// export const TabContent = styled.div`
//   grid-column: full-start / full-end;
//   margin: 3rem 4rem;
// `;
