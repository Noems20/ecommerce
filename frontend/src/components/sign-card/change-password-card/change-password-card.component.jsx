import React, { useEffect, useState } from 'react';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { clearUiErrors } from '../../../redux/ui/uiActions';
import { resetPassword } from '../../../redux/user/userActions';

// COMPONENTS
import CustomButton from '../../custom-button/custom-button.component';
import Message from '../../messages/normal-message/normal-message.component';
import TextInput from '../../form-inputs/text-input/text-input.component';

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

const ChangePasswordCard = ({ variants, token }) => {
  // ----------------------------- STATE AND CONSTANTS -----------------
  const [userCredentials, setUserCredentials] = useState({
    password: '',
    passwordConfirm: '',
  });

  const { password, passwordConfirm } = userCredentials;

  const dispatch = useDispatch();
  const { uiErrors, loading } = useSelector((state) => state.ui);

  // ----------------------------- USE EFFECT -----------------------
  useEffect(() => {
    return () => {
      dispatch(clearUiErrors());
    };
  }, [dispatch]);

  // --------------------------- HANDLERS -------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(resetPassword(password, passwordConfirm, token));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // [] -> To access variable not only plain text for name property
    setUserCredentials({ ...userCredentials, [name]: value });
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
        <SignTitle>Nueva contraseña</SignTitle>
        <SignText>
          Escribe la nueva contraseña para tu cuenta de Copias y
          Encuadernaciones Noé.
        </SignText>
        {uiErrors.errorsOne.general && (
          <Message
            title='Error'
            text={uiErrors.errorsOne.general}
            type='error'
          />
        )}

        <TextInput
          name='password'
          type='password'
          handleChange={handleChange}
          value={password}
          label='Contraseña'
          error={uiErrors.errorsOne.password}
        />
        <TextInput
          name='passwordConfirm'
          type='password'
          handleChange={handleChange}
          value={passwordConfirm}
          label='Confirmar contraseña'
          error={uiErrors.errorsOne.passwordConfirm}
        />
        <CustomButton
          primary
          loading={loading.firstLoader}
          disabled={loading.firstLoader}
          type='submit'
          onClick={handleSubmit}
        >
          Restablecer contraseña
        </CustomButton>
      </Form>
    </SignCard>
  );
};

export default ChangePasswordCard;
