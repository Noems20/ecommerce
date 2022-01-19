import React, { useState, useEffect } from 'react';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import {
  createProductReview,
  fetchProductReviews,
} from '../../redux/products/productsActions';
import { clearUiErrors } from '../../redux/ui/uiActions';

// COMPONENTS
import Review from '../review/review.component';
import Rating from '../rating/rating.component';
import RatingInteractive from '../rating/rating-interactive/rating-interactive.component';
import RatingBar from '../rating-bar/rating-bar.component';
import TextInput from '../form-inputs/text-input/text-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { LoaderModified } from '../../general.styles';

// STYLES
import {
  ReviewsContainer,
  Title,
  ReviewForm,
  ReviewsResumeContainer,
  ReviewsCount,
  RatingBarsContainer,
  Reviews,
  NoReviewsTitle,
} from './product-reviews.styles';

const ProductReviews = ({
  productId,
  reviewsQuantity,
  ratingsAverage,
  reviewsStats,
}) => {
  // ------------------------------- STATE AND CONSTANTS ------------------
  const [reviewData, setReviewData] = useState({
    title: '',
    review: '',
  });

  const [reviewRating, setReviewRating] = useState(5);

  const { title: reviewTitle, review } = reviewData;

  const dispatch = useDispatch();
  const { user, review: userReview } = useSelector((state) => state.user);
  const { reviews } = useSelector((state) => state.products);
  const {
    loading,
    uiErrors: { errorsTwo },
  } = useSelector((state) => state.ui);

  // ------------------------------- USE EFFECT'S -------------------------
  useEffect(() => {
    dispatch(fetchProductReviews(productId, 0));
    return () => {
      dispatch(clearUiErrors());
    };
  }, [dispatch, productId]);

  // ------------------------------- HANDLERS -------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;

    setReviewData({ ...reviewData, [name]: value });
  };

  const handleSubmitCreate = (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId, reviewTitle, reviewRating, review));
  };
  const handleFilter = (filterNumber) => {
    dispatch(fetchProductReviews(productId, filterNumber));
  };

  // ------------------------------- RENDER -------------------------------
  const reviewForm = (handleSubmit) => {
    return (
      <ReviewForm onSubmit={handleSubmit}>
        <RatingInteractive
          value={reviewRating}
          handleChange={setReviewRating}
          text={`${reviewRating} de 5`}
        />
        <TextInput
          name='title'
          type='text'
          handleChange={handleChange}
          value={reviewTitle}
          label='Titulo'
          error={errorsTwo.title}
        />
        <TextInput
          textarea
          rows={2}
          name='review'
          type='review'
          handleChange={handleChange}
          value={review}
          label='Reseña'
          error={errorsTwo.review}
        />
        <CustomButton
          primary
          type='submit'
          style={{ justifySelf: 'start' }}
          loading={loading.secondLoader}
          disabled={loading.secondLoader}
        >
          Crear reseña
        </CustomButton>
      </ReviewForm>
    );
  };

  return (
    <ReviewsContainer>
      <ReviewsResumeContainer>
        <Title>Opiniones de clientes</Title>
        <Rating value={ratingsAverage} text={`${ratingsAverage} de 5`}></Rating>
        <ReviewsCount>{reviewsQuantity} calificaciones</ReviewsCount>
        <RatingBarsContainer>
          <RatingBar
            rating='Todos'
            percentage='100%'
            onClick={() => handleFilter(0)}
          />
          <RatingBar
            rating='5 estrellas'
            percentage={`${reviewsStats[5]}%`}
            onClick={() => handleFilter(5)}
          />
          <RatingBar
            rating='4 estrellas'
            percentage={`${reviewsStats[4]}%`}
            onClick={() => handleFilter(4)}
          />
          <RatingBar
            rating='3 estrellas'
            percentage={`${reviewsStats[3]}%`}
            onClick={() => handleFilter(3)}
          />
          <RatingBar
            rating='2 estrellas'
            percentage={`${reviewsStats[2]}%`}
            onClick={() => handleFilter(2)}
          />
          <RatingBar
            rating='1 estrella'
            percentage={`${reviewsStats[1]}%`}
            onClick={() => handleFilter(1)}
          />
        </RatingBarsContainer>
      </ReviewsResumeContainer>

      <Reviews>
        {user && (
          <>
            <Title>{userReview ? 'Tu reseña' : 'Crear reseña'}</Title>

            {userReview ? (
              <Review key={userReview._id} review={userReview} />
            ) : (
              reviewForm(handleSubmitCreate)
            )}
          </>
        )}
        <Title>Reseñas</Title>
        {!loading.secondFetchLoader ? (
          <LoaderModified />
        ) : reviews.length === 0 ? (
          <NoReviewsTitle>SIN RESEÑAS</NoReviewsTitle>
        ) : (
          reviews.map((review) => {
            return <Review key={review._id} review={review} />;
          })
        )}
      </Reviews>
    </ReviewsContainer>
  );
};

export default ProductReviews;
