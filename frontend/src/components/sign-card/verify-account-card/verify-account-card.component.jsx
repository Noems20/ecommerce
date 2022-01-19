import React, { useEffect } from 'react';

// REDUX
import { useSelector, useDispatch, batch } from 'react-redux';
import { clearUiErrors } from '../../../redux/ui/uiActions';
import { verifyAccount } from '../../../redux/user/userActions';

// COMPONENTS
import CustomButton from '../../custom-button/custom-button.component';
import Message from '../../messages/normal-message/normal-message.component';

// LOGO
import logo4 from '../../../components/form-container/logo4.svg';

// STYLES
import {
  SignCard,
  Form,
  Logo,
  SignTitle,
  SignText,
} from '../../../general.styles';

const VerifyAccountCard = ({ variants, token }) => {
  // ----------------------------- STATE AND CONSTANTS -----------------
  const dispatch = useDispatch();
  const { uiErrors, loading } = useSelector((state) => state.ui);

  // ----------------------------- USE EFFECT -----------------------
  useEffect(() => {
    return () => {
      batch(() => {
        dispatch(clearUiErrors());
      });
    };
  }, [dispatch]);

  // --------------------------- HANDLERS -------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(verifyAccount(token));
  };
  return (
    <SignCard
      variants={variants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <Form>
        <Logo src={logo4} />
        <SignTitle>Verificar cuenta</SignTitle>
        <SignText>
          Da click en el botón para verificar tu cuenta de Copias y
          Encuadernaciones Noé.
        </SignText>
        {uiErrors.errorsOne.general && (
          <Message
            title='Error'
            text={uiErrors.errorsOne.general}
            type='error'
          />
        )}
        <CustomButton
          primary
          loading={loading.firstLoader}
          disabled={loading.firstLoader}
          type='submit'
          onClick={handleSubmit}
        >
          Verificar cuenta
        </CustomButton>
      </Form>
    </SignCard>
  );
};

export default VerifyAccountCard;
