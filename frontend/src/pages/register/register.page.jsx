import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { clearSuccess, clearUiErrors } from '../../redux/ui/uiActions';

// COMPONENTS
import SignUp from '../../components/sign-up/sign-up.component';
import SuccessCard from '../../components/sign-card/success-card/success-card.component';
import FormContainer from '../../components/form-container/form-container.component';

// STYLES
import { PageGrid } from '../../general.styles';

const Register = () => {
  // ---------------------------- STATE AND CONSTANTS --------------------
  const [currentTab, setCurrentTab] = useState('register');

  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.ui);

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
    if (success === true) {
      setCurrentTab('success');
      dispatch(clearSuccess());
    }
  }, [dispatch, success]);

  useEffect(() => {
    return () => {
      dispatch({
        type: 'SET_UI_LOADING',
        payload: { firstLoader: false },
      });
      dispatch(clearUiErrors());
    };
  }, [dispatch]);

  // ------------------------------- HANDLERS -------------------------

  return (
    <PageGrid
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      <FormContainer>
        <AnimatePresence exitBeforeEnter>
          {currentTab === 'register' ? (
            <SignUp variants={cardVariants} key={1} />
          ) : (
            <SuccessCard
              variants={cardVariants}
              title='Cuenta creada'
              text='Hemos enviado un correo electrónico a tu Email, por favor sigue las
          instrucciones para verificar tu cuenta.'
              key={2}
            />
          )}
        </AnimatePresence>
      </FormContainer>
    </PageGrid>
  );
};

export default Register;
