import React, { useState } from 'react';

// STYLES
import {
  Container,
  InputContainer,
  Input,
  TextAreaInput,
  FormInputLabel,
  ErrorText,
  IconContainer,
} from './text-input.styles';

// ICONS
import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs';

const TextInput = ({
  handleChange,
  label,
  error,
  textarea,
  password,
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState('password');

  return (
    <Container>
      <InputContainer>
        {textarea ? (
          <TextAreaInput
            onChange={handleChange}
            error={error ? true : false}
            className={props.value.length ? 'active' : ''}
            type={password ? showPassword : type}
            {...props}
          />
        ) : (
          <Input
            onChange={handleChange}
            error={error ? true : false}
            className={props.value.length ? 'active' : ''}
            type={password ? showPassword : type}
            {...props}
          />
        )}

        {label ? (
          <FormInputLabel
            className={props.value.length ? 'shrink' : ''}
            error={error ? true : false}
          >
            {label}
          </FormInputLabel>
        ) : null}

        {password && (
          <IconContainer
            onClick={() =>
              setShowPassword(showPassword === 'password' ? 'text' : 'password')
            }
          >
            {showPassword === 'password' ? <BsEyeSlashFill /> : <BsEyeFill />}
          </IconContainer>
        )}
      </InputContainer>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export default TextInput;
