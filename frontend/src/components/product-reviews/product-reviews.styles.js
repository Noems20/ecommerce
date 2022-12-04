import styled from "styled-components";

export const ReviewsContainer = styled.div`
  grid-column: full-start/ full-end;
  margin: 3rem 4rem;
  margin-top: 5rem;

  display: grid;
  grid-gap: 5rem;
  grid-template-columns: 0.4fr 1fr;

  @media only screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }

  @media only screen and (max-width: 500px) {
    margin: 2rem 3rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  color: var(--color-grey-product);
  font-weight: 700;

  text-transform: uppercase;
`;

export const ReviewForm = styled.form`
  display: grid;
  grid-gap: 2rem;
`;

export const ReviewsResumeContainer = styled.div`
  padding: 2rem;
  height: max-content;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 1px 5px;
  background-color: #fff;

  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 10rem;

  display: grid;
  grid-gap: 1rem;

  @media only screen and (max-width: 1000px) {
    position: static;
  }
`;

export const ReviewsCount = styled.p`
  font-size: 1.7rem;
  color: var(--color-grey-product);
`;

export const RatingBarsContainer = styled.div`
  color: var(--color-grey-product);

  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: max-content 1fr max-content;
`;

export const Reviews = styled.div`
  height: max-content;
  display: grid;
  grid-gap: 2rem;
`;

export const NoReviewsTitle = styled.h1`
  font-size: 4rem;
  padding: 4rem 0;
  color: var(--color-grey-product);
  font-weight: 700;

  text-transform: uppercase;
  text-align: center;
`;
