import styled from 'styled-components';

// --------------------------------------------------------------
// REVIEW CONTENT
// --------------------------------------------------------------
export const ReviewContent = styled.div`
  margin: 2rem;

  display: grid;
  grid-gap: 3rem;
  grid-template-columns: 0.2fr 1fr;

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
`;

// ---------------------------------
// PHOTO
// ---------------------------------

export const UserPhotoContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-auto-rows: max-content;
  justify-items: center;
`;

export const UserPhoto = styled.div`
  height: 10rem;
  width: 10rem;

  border-radius: 50%;
  border: 5px solid var(--color-primary);
  background-image: ${(props) => `url(${props.url})`};
  background-size: cover;
  background-position: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 8px 1px;
`;

export const UserName = styled.h2`
  font-size: 1.8rem;
  font-weight: 400;
  text-align: center;
`;

// ---------------------------------
// REVIEW INFO
// ---------------------------------
export const ReviewInfo = styled.div`
  display: grid;
  justify-items: start;
  grid-gap: 0.5rem;
  grid-auto-rows: max-content;

  @media only screen and (max-width: 600px) {
    justify-items: center;
    grid-gap: 1rem;
  }
`;

export const ReviewTitle = styled.h2`
  text-align: center;
  font-size: 1.8rem;
`;

export const ReviewDate = styled.p`
  font-size: 1.6rem;
  color: var(--color-grey-product);
`;

export const ReviewText = styled.p`
  font-size: 1.8rem;
`;

// --------------------------------------------------------------
// BUTTONS CONTAINER
// --------------------------------------------------------------
export const ButtonsContainer = styled.div`
  justify-self: start;
  margin-top: 1rem;
  display: grid;
  grid-gap: 2rem;
  grid-auto-flow: column;

  @media only screen and (max-width: 600px) {
    margin-top: 0;
    grid-gap: 1rem;
    grid-auto-flow: row;
    justify-self: stretch;
  }
`;

// --------------------------------------------------------------
// MODAL
// --------------------------------------------------------------
export const ReviewForm = styled.form`
  width: 70vw;
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
  grid-gap: 3rem;

  @media only screen and (max-width: 700px) {
    padding: 2rem;
    width: 90vw;
  }
`;

export const FormTitle = styled.h1`
  color: var(--color-primary);
  line-height: 1;
`;
