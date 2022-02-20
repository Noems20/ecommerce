import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/user/userActions';
import { clearUiErrors } from '../../redux/ui/uiActions';

// COMPONENTS
import TextInput from '../form-inputs/text-input/text-input.component';
import CustomButton from '../custom-button/custom-button.component';
import Message from '../messages/normal-message/normal-message.component';

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
// import logo from './logo.svg';
// import logo2 from './logo2.png';
// import logo3 from './logo3.svg';
import logo4 from '../form-container/logo4.svg';
// import logo5 from './logo5.svg';

const SignIn = ({ setTab, variants }) => {
  // ---------------------------- STATE AND CONSTANTS --------------------
  let location = useLocation();
  const history = useHistory();
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  const { email, password } = userCredentials;
  const dispatch = useDispatch();
  const { uiErrors, loading } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.user);
  const { errorsOne } = uiErrors;

  // ----------------------------- USE EFFECT'S ------------------------

  useEffect(() => {
    dispatch(clearUiErrors());
    return () => {
      dispatch({
        type: 'SET_UI_LOADING',
        payload: { firstLoader: false },
      });
      dispatch(clearUiErrors());
    };
  }, [dispatch]);

  const redirect = location.search
    ? location.search.split('redirect=')[1]
    : '/';

  useEffect(() => {
    if (user) {
      history.push(redirect);
    }
  }, [history, user, redirect]);

  // ------------------------------- HANDLERS -------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(login(email, password));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };
  return (
    <SignCard
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Form>
        <Logo src={logo4} />
        <SignTitle>Iniciar sesión</SignTitle>
        {uiErrors.errorsOne.general && (
          <Message
            title="Error"
            text={uiErrors.errorsOne.general}
            type="error"
          />
        )}
        <TextInput
          name="email"
          type="text"
          handleChange={handleChange}
          value={email}
          label="Email"
          error={errorsOne.email}
          required
        />
        <TextInput
          password
          name="password"
          handleChange={handleChange}
          value={password}
          label="Contraseña"
          error={errorsOne.password}
          required
        />
        <CustomButton
          primary
          loading={loading.firstLoader}
          disabled={loading.firstLoader}
          type="submit"
          onClick={handleSubmit}
        >
          Iniciar Sesión
        </CustomButton>
        <BottomLinksContainer>
          <BottomText>
            ¿No tienes cuenta? Registrate{' '}
            <LinkText
              to={redirect ? `/registro?redirect=${redirect}` : '/registro'}
            >
              aqui
            </LinkText>
          </BottomText>
          <BottomText>
            ¿Olvidaste tu contraseña? da click{' '}
            <LinkText as="span" onClick={() => setTab('forgot-password')}>
              aqui
            </LinkText>
          </BottomText>
        </BottomLinksContainer>
      </Form>
    </SignCard>
  );
};

export default SignIn;
