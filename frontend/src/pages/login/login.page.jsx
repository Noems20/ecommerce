import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { clearSuccess, clearUiErrors } from '../../redux/ui/uiActions';

// COMPONENTS
import FormContainer from '../../components/form-container/form-container.component';
import ForgotPassword from '../../components/sign-card/forgot-password/forgot-password.component';
import SuccessCard from '../../components/sign-card/success-card/success-card.component';
import SignIn from '../../components/sign-in/sign-in.component';

// STYLES
import { PageGrid } from '../../general.styles';

const Login = () => {
  // ---------------------------- STATE AND CONSTANTS --------------------
  const [currentTab, setCurrentTab] = useState('login');

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

  // ---------------------------- RENDER SWITCH --------------------
  function renderSwitch(currentTab) {
    switch (currentTab) {
      case 'login':
        return (
          <SignIn setTab={setCurrentTab} key={1} variants={cardVariants} />
        );
      case 'forgot-password':
        return (
          <ForgotPassword
            setTab={setCurrentTab}
            key={2}
            variants={cardVariants}
          />
        );
      case 'success':
        return (
          <SuccessCard
            title='Correo enviado'
            text='Revisa tu correo electrónico y sigue las instrucciones para recuperar
          tu contraseña.'
            key={3}
            variants={cardVariants}
          />
        );
      default:
        <SignIn setTab={setCurrentTab} key={1} variants={cardVariants} />;
    }
  }

  return (
    <PageGrid
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      <FormContainer>
        <AnimatePresence exitBeforeEnter>
          {renderSwitch(currentTab)}
        </AnimatePresence>
      </FormContainer>
    </PageGrid>
  );
};

export default Login;
