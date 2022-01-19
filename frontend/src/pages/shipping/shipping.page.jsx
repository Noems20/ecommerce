import React, { useState } from 'react';

// Components
import CustomButton from '../../components/custom-button/custom-button.component';
import TextInput from '../../components/form-inputs/text-input/text-input.component';

// Styles
import {
  Container,
  FormContainer,
  Form,
  FormTitle,
} from './shipping.page.styles';

const Shipping = () => {
  const [shipping, setShipping] = useState({
    state: '',
    city: '',
    suburb: '',
    postalCode: '',
    address: '',
    references: '',
  });

  const { state, city, suburb, postalCode, address, references } = shipping;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setShipping({ ...shipping, [name]: value });
  };

  return (
    <Container>
      <FormContainer>
        <Form>
          <FormTitle>Dirección de Envio</FormTitle>
          <TextInput
            name='state'
            type='text'
            value={state}
            label='Estado'
            onChange={handleChange}
            required
          />
          <TextInput
            name='city'
            type='text'
            value={city}
            label='Municipio'
            onChange={handleChange}
            required
          />
          <TextInput
            name='suburb'
            type='text'
            value={suburb}
            label='Colonia'
            onChange={handleChange}
            required
          />
          <TextInput
            name='postalCode'
            type='text'
            value={postalCode}
            label='Codigo postal'
            onChange={handleChange}
            required
          />
          <TextInput
            name='address'
            type='text'
            value={address}
            label='Dirección'
            onChange={handleChange}
            required
          />
          <TextInput
            name='references'
            textArea
            rows='2'
            value={references}
            label='Referencias (Opcional)'
            onChange={handleChange}
          />
          <CustomButton type='submit' onClick={handleSubmit}>
            Añadir dirección
          </CustomButton>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default Shipping;
