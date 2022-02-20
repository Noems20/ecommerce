import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { clearSuccess, clearUiErrors } from '../../redux/ui/uiActions';
import { signUp } from '../../redux/user/userActions';

// COMPONENTS
import TextInput from '../../components/form-inputs/text-input/text-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

// STYLES
import {
  SignCard,
  Logo,
  SignTitle,
  Form,
  BottomLinksContainer,
  BottomText,
  LinkText,
} from '../../general.styles';

// LOGOS
import logo4 from '../form-container/logo4.svg';

const SignUp = ({ variants }) => {
  // ---------------------------- STATE AND CONSTANTS --------------------
  let location = useLocation();

  const [userCredentials, setUserCredentials] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, password, passwordConfirm } = userCredentials;

  const dispatch = useDispatch();
  const { uiErrors, loading } = useSelector((state) => state.ui);

  // ----------------------------- USE EFFECT'S ------------------------
  useEffect(() => {
    dispatch(clearUiErrors());
    return () => {
      dispatch({
        type: 'SET_UI_LOADING',
        payload: { firstLoader: false },
      });
      dispatch(clearSuccess());
      dispatch(clearUiErrors());
    };
  }, [dispatch]);

  // ------------------------------- HANDLERS -------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(signUp(name, email, password, passwordConfirm));
  };

  const redirect = location.search
    ? location.search.split('redirect=')[1]
    : '/';

  return (
    <SignCard
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Form>
        <Logo src={logo4} />
        <SignTitle>Crear cuenta</SignTitle>
        <TextInput
          name="name"
          type="text"
          handleChange={handleChange}
          value={name}
          label="Nombre"
          error={uiErrors.errorsOne.name}
          required
        />
        <TextInput
          name="email"
          type="text"
          handleChange={handleChange}
          value={email}
          label="Email"
          error={uiErrors.errorsOne.email}
          required
        />
        <TextInput
          password
          name="password"
          handleChange={handleChange}
          value={password}
          label="Contraseña"
          error={uiErrors.errorsOne.password}
          required
        />
        <TextInput
          password
          name="passwordConfirm"
          handleChange={handleChange}
          value={passwordConfirm}
          label="Confirmar contraseña"
          error={uiErrors.errorsOne.passwordConfirm}
          required
        />
        <CustomButton
          primary
          type="submit"
          loading={loading.firstLoader}
          disabled={loading.firstLoader}
          onClick={handleSubmit}
        >
          Crear cuenta
        </CustomButton>
        <BottomLinksContainer>
          <BottomText>
            ¿Ya tienes cuenta? Inicia sesión{' '}
            <LinkText to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              aqui
            </LinkText>
          </BottomText>
        </BottomLinksContainer>
      </Form>
    </SignCard>
  );
};

export default SignUp;
