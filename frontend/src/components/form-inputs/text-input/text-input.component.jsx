import React from 'react';

import {
  Container,
  InputContainer,
  Input,
  TextAreaInput,
  FormInputLabel,
  ErrorText,
} from './text-input.styles';

const TextInput = ({ handleChange, label, error, textarea, ...props }) => {
  return (
    <Container>
      <InputContainer>
        {textarea ? (
          <TextAreaInput
            onChange={handleChange}
            error={error ? true : false}
            className={props.value.length ? 'active' : ''}
            {...props}
          />
        ) : (
          <Input
            onChange={handleChange}
            error={error ? true : false}
            className={props.value.length ? 'active' : ''}
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
      </InputContainer>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export default TextInput;
