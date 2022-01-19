import React, { useState, useEffect } from 'react';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../../redux/user/userActions';
import { clearUiErrors } from '../../../redux/ui/uiActions';

// COMPONENTS
import TextInput from '../../../components/form-inputs/text-input/text-input.component';
import CustomButton from '../../../components/custom-button/custom-button.component';

// STYLES
import {
  SignCard,
  Form,
  BackButton,
  Logo,
  SignTitle,
  SignText,
} from '../../../general.styles';

// ICONS
import { FaArrowCircleLeft } from 'react-icons/fa';

// LOGOS
import logo4 from '../../form-container/logo4.svg';

const ForgotPassword = ({ variants, setTab }) => {
  // ---------------------------- STATE AND CONSTANTS --------------------
  const [userCredentials, setUserCredentials] = useState({
    email: '',
  });
  const { email } = userCredentials;
  const dispatch = useDispatch();
  const { uiErrors, loading } = useSelector((state) => state.ui);

  // ---------------------------- USE EFFECT'S --------------------
  useEffect(() => {
    return () => {
      dispatch(clearUiErrors());
    };
  }, [dispatch]);

  // ---------------------------- HANDLERS --------------------

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(forgotPassword(email));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

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
        <BackButton onClick={() => setTab('login')}>
          <FaArrowCircleLeft />
        </BackButton>

        <Logo src={logo4} />
        <SignTitle>Ayuda con la contraseña</SignTitle>
        <SignText>
          Escribe la dirección de correo electrónico asociado a tu cuenta de
          Copias Noé.
        </SignText>
        <TextInput
          name='email'
          type='text'
          handleChange={handleChange}
          value={email}
          label='Email'
          error={uiErrors.errorsOne.email}
          required
        />
        <CustomButton
          primary
          loading={loading.firstLoader}
          disabled={loading.firstLoader}
          type='submit'
          onClick={handleSubmit}
        >
          Enviar correo
        </CustomButton>
      </Form>
    </SignCard>
  );
};

export default ForgotPassword;
