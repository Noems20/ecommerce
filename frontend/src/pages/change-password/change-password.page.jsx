import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { clearSuccess } from '../../redux/ui/uiActions';

// COMPONENTS
import FormContainer from '../../components/form-container/form-container.component';
import ChangePasswordCard from '../../components/sign-card/change-password-card/change-password-card.component';
import SuccessCard from '../../components/sign-card/success-card/success-card.component';

// STYLES
import { PageGrid } from '../../general.styles';

const ChangePassword = () => {
  // ---------------------------- STATE AND CONSTANTS --------------------
  const { token } = useParams();
  const { success } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const cardVariants = {
    hidden: {
      x: '-100vw',
      transition: {
        type: 'tween',
      },
    },
    visible: {
      x: 0,
      transition: {
        type: 'tween',
      },
    },
    exit: {
      x: '100vw',
      transition: {
        type: 'tween',
      },
    },
  };

  // ---------------------------- USE EFFECT'S ---------------------
  useEffect(() => {
    return () => {
      dispatch(clearSuccess());
    };
  }, [dispatch]);

  return (
    <PageGrid
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      <FormContainer>
        <AnimatePresence exitBeforeEnter>
          {success ? (
            <SuccessCard
              variants={cardVariants}
              title='Contraseña modificada correctamente'
              text='Espere un momento, se iniciará sesión automáticamente.'
            >
              Exito
            </SuccessCard>
          ) : (
            <ChangePasswordCard variants={cardVariants} token={token} key={2} />
          )}
        </AnimatePresence>
      </FormContainer>
    </PageGrid>
  );
};

export default ChangePassword;
