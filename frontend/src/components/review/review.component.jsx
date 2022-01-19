import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import moment from 'moment';
import 'moment/locale/es-us';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import {
  updateProductReview,
  deleteProductReview,
} from '../../redux/products/productsActions';
import { clearUiErrors } from '../../redux/ui/uiActions';

// COMPONENTS
import Rating from '../rating/rating.component';
import CustomButton from '../custom-button/custom-button.component';
import Modal from '../modal/modal.component';
import TextInput from '../form-inputs/text-input/text-input.component';
import RatingInteractive from '../rating/rating-interactive/rating-interactive.component';
import DecorationCard from '../decoration-card/decoration-card.component';

// STYLES
import {
  ReviewContent,
  UserPhotoContainer,
  UserPhoto,
  UserName,
  ReviewInfo,
  ReviewTitle,
  ReviewDate,
  ReviewText,
  ButtonsContainer,
  ReviewForm,
  FormTitle,
} from './review.styles';

const Review = ({ review }) => {
  // -------------------------------- STATE AND CONSTANTS ------------
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    formTitle: review.title,
    formReview: review.review,
  });

  const [reviewRating, setReviewRating] = useState(review.rating);

  const { formTitle, formReview } = formData;
  const { review: userReview } = useSelector((state) => state.user);
  const {
    loading,
    uiErrors: { errorsTwo },
  } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  // ------------------------------ USE EFFECT'S -----------------
  useEffect(() => {
    return () => {
      dispatch(clearUiErrors());
    };
  }, [dispatch]);

  // ------------------------------ HANDLERS -----------------
  const handleDelete = () => {
    setDeleteLoading(true);
    dispatch(deleteProductReview(review._id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProductReview(review._id, formTitle, reviewRating, formReview)
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      formTitle: review.title,
      formReview: review.review,
    });
    setReviewRating(review.rating);

    dispatch(clearUiErrors());
  };

  const handleOpen = () => {
    setFormData({
      formTitle: review.title,
      formReview: review.review,
    });
    setReviewRating(review.rating);
    setOpen('edit');
  };

  return (
    <>
      <DecorationCard>
        <ReviewContent>
          <UserPhotoContainer>
            <UserPhoto
              url={`https://copiasnoe-ecommerce.s3.amazonaws.com/users/${review.user.photo}`}
            />
            <UserName>{review.user.name}</UserName>
          </UserPhotoContainer>
          <ReviewInfo>
            <ReviewTitle>{review.title}</ReviewTitle>
            <Rating value={review.rating} text={`${review.rating} de 5`} />
            <ReviewDate>{moment(review.createdAt).format('LL')}</ReviewDate>
            <ReviewText>{review.review}</ReviewText>
            {userReview && review._id === userReview._id && (
              <ButtonsContainer>
                <CustomButton primary onClick={handleOpen}>
                  Editar reseña
                </CustomButton>
                <CustomButton
                  danger
                  onClick={handleDelete}
                  loading={deleteLoading}
                  disabled={deleteLoading}
                >
                  Eliminar reseña
                </CustomButton>
              </ButtonsContainer>
            )}
          </ReviewInfo>
        </ReviewContent>
      </DecorationCard>

      <AnimatePresence>
        {open === 'edit' && (
          <Modal handleClose={handleClose}>
            <ReviewForm onSubmit={handleSubmit}>
              <FormTitle>Editar reseña</FormTitle>
              <RatingInteractive
                value={reviewRating}
                handleChange={setReviewRating}
                text={`${reviewRating} de 5`}
              />
              <TextInput
                textarea
                rows={2}
                type='text'
                handleChange={handleChange}
                name='formTitle'
                value={formTitle}
                label='Titulo'
                error={errorsTwo.title}
              />
              <TextInput
                textarea
                rows={5}
                type='formReview'
                handleChange={handleChange}
                name='formReview'
                value={formReview}
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
                Editar reseña
              </CustomButton>
            </ReviewForm>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Review;
