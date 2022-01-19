import React, { useState, useEffect } from 'react';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { updateMe, updateMyPassword } from '../../../redux/user/userActions';
import { clearUiErrors } from '../../../redux/ui/uiActions';

// COMPONENTS
import TextInput from '../../form-inputs/text-input/text-input.component';
import CustomButton from '../../custom-button/custom-button.component';

// STYLES
import { Title, Line } from '../tab-styles';
import { Container, Content, FormContainer } from './profile-tab.styles';

const ProfileTab = ({ variants }) => {
  // ------------------------------------- STATE AND CONSTANTS ----------------------
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { uiErrors, loading } = useSelector((state) => state.ui);

  const [userCredentials, setUserCredentials] = useState({
    name: user.name,
    email: user.email,
    phone: '(492) 134 7258',
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, phone, passwordCurrent, password, passwordConfirm } =
    userCredentials;

  // --------------------------------- USE EFFECTS -------------------------
  useEffect(() => {
    // ----------- SET FORM VALUES AFTER SUBMIT -------
    setUserCredentials({
      name: user.name,
      email: user.email,
      phone: '(492) 134 7258',
      passwordCurrent: '',
      password: '',
      passwordConfirm: '',
    });

    // Clean up also runs after form submit because of
    // set credential dependency
    return () => {
      dispatch(clearUiErrors());
    };
  }, [setUserCredentials, user, dispatch]);

  // ---------------------------------- HANDLERS ----------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMe(name));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMyPassword(passwordCurrent, password, passwordConfirm));
  };

  return (
    <Container
      variants={variants}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      <Content>
        <FormContainer onSubmit={handleDetailsSubmit}>
          <Title>Configuración de cuenta</Title>
          <TextInput
            name='name'
            type='text'
            handleChange={handleChange}
            value={name}
            label='Nombre'
            error={uiErrors.errorsOne.name}
            required
          />
          <TextInput
            name='phone'
            type='text'
            handleChange={handleChange}
            value={phone}
            label='Teléfono'
            // error={uiErrors.errorsOne.phone}
            required
          />
          <TextInput
            disabled={true}
            name='email'
            type='text'
            handleChange={handleChange}
            value={email}
            label='Email'
            error={uiErrors.errorsOne.email}
          />
          <CustomButton
            primary
            loading={loading.firstLoader}
            disabled={loading.secondLoader || loading.firstLoader}
          >
            Actualizar información
          </CustomButton>
        </FormContainer>
        <Line />
        <FormContainer onSubmit={handlePasswordSubmit}>
          <Title>Cambiar contraseña</Title>
          <TextInput
            name='passwordCurrent'
            type='password'
            handleChange={handleChange}
            value={passwordCurrent}
            label='Contraseña actual'
            error={uiErrors.errorsTwo.passwordCurrent}
          />
          <TextInput
            name='password'
            type='password'
            handleChange={handleChange}
            value={password}
            label='Nueva contraseña'
            error={uiErrors.errorsTwo.password}
          />
          <TextInput
            name='passwordConfirm'
            type='password'
            handleChange={handleChange}
            value={passwordConfirm}
            label='Confirmar contraseña'
            error={uiErrors.errorsTwo.passwordConfirm}
          />
          <CustomButton
            primary
            loading={loading.secondLoader}
            disabled={loading.secondLoader || loading.firstLoader}
          >
            Actualizar contraseña
          </CustomButton>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default ProfileTab;
