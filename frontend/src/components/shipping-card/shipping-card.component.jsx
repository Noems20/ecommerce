import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import {
  setAddresses,
  makeAddressPredetermined,
  removeAddress,
} from '../../redux/addresses/addressesActions';
import { clearUiErrors } from '../../redux/ui/uiActions';

// COMPONENTS
import Modal from '../modal/modal.component';
import Message from '../messages/normal-message/normal-message.component';
import TextInput from '../form-inputs/text-input/text-input.component';
import SelectInput from '../form-inputs/select-input/select-input.component';
import CustomButton from '../custom-button/custom-button.component';

// STYLES
import {
  Card,
  CardMenu,
  IconContainer,
  CardHeader,
  State,
  City,
  CardBody,
  TwoColumns,
  InfoContainer,
  InfoTitle,
  Info,
  EditForm,
  TwoColumnsModal,
  FormTitle,
  ButtonContainer,
  Button,
} from './shipping-card.styles';

// ICONS
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const ShippingCard = ({
  address,
  index,
  select,
  selected = false,
  setSelected,
  disabled = false,
}) => {
  // ---------------------------- STATE AND CONSTANTS ------------------
  const [open, setOpen] = useState(false);
  const [addressData, setAddressData] = useState({
    state: address.state,
    city: address.city,
    suburb: address.suburb,
    postalCode: address.postalcode,
    addressInput: address.address,
    phone: address.phone,
    references: address.references,
    instructions: address.instructions,
  });

  const {
    state,
    city,
    suburb,
    postalCode,
    addressInput,
    phone,
    references,
    instructions,
  } = addressData;

  const dispatch = useDispatch();
  const {
    uiErrors: { errorsOne },
    loading,
  } = useSelector((state) => state.ui);

  // ---------------------------------- HANDLERS ---------------------------
  const handleClose = () => {
    setOpen(false);
    setAddressData({
      state: address.state,
      city: address.city,
      suburb: address.suburb,
      postalCode: address.postalcode,
      addressInput: address.address,
      phone: address.phone,
      references: address.references,
      instructions: address.instructions,
    });
    dispatch(clearUiErrors());
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAddressData({ ...addressData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      setAddresses(
        index,
        state,
        city,
        postalCode,
        phone,
        suburb,
        addressInput,
        references,
        instructions,
        address.predetermined
      )
    );
  };

  const handleDelete = () => {
    dispatch(removeAddress(index));
  };

  const handlePredetermined = () => {
    dispatch(makeAddressPredetermined(index));
  };

  const handleSelect = () => {
    setSelected(index);
  };

  return (
    <>
      <Card className={!disabled && selected ? 'selected' : ''}>
        {!disabled && (
          <CardMenu>
            <IconContainer edit onClick={() => setOpen('edit')}>
              <FaEdit />
            </IconContainer>
            <IconContainer onClick={() => setOpen('delete')}>
              <FaTrashAlt />
            </IconContainer>
          </CardMenu>
        )}
        <CardHeader>
          <State>{address.state}</State>
          <City>{address.city}</City>
        </CardHeader>
        <CardBody>
          <TwoColumns>
            <InfoContainer>
              <InfoTitle>Colonia</InfoTitle>
              <Info>{address.suburb}</Info>
            </InfoContainer>
            <InfoContainer>
              <InfoTitle>Dirección</InfoTitle>
              <Info>{address.address}</Info>
            </InfoContainer>
            <InfoContainer>
              <InfoTitle>Codigo postal</InfoTitle>
              <Info>{address.postalcode}</Info>
            </InfoContainer>
            <InfoContainer>
              <InfoTitle>Teléfono</InfoTitle>
              <Info>{address.phone}</Info>
            </InfoContainer>
          </TwoColumns>
          {address.references && (
            <InfoContainer>
              <InfoTitle>Referencias</InfoTitle>
              <Info>{address.references}</Info>
            </InfoContainer>
          )}
          {address.instructions && (
            <InfoContainer>
              <InfoTitle>Instrucciones de entrega</InfoTitle>
              <Info>{address.instructions}</Info>
            </InfoContainer>
          )}
        </CardBody>
        <ButtonContainer>
          {!disabled ? (
            select ? (
              <Button disabled={selected} onClick={handleSelect}>
                {selected ? 'Seleccionado' : 'Seleccionar'}
              </Button>
            ) : (
              <Button
                disabled={address.predetermined}
                onClick={handlePredetermined}
              >
                {address.predetermined
                  ? 'Predeterminado'
                  : 'Hacer predeterminado'}
              </Button>
            )
          ) : null}
        </ButtonContainer>
      </Card>

      {/* -------------------------- MODAL ----------------------------- */}
      <AnimatePresence>
        {open === 'edit' && (
          <Modal handleClose={handleClose}>
            <EditForm onSubmit={handleSubmit}>
              <FormTitle>Editar dirección</FormTitle>
              <TwoColumnsModal>
                <SelectInput
                  label="Estado"
                  name="state"
                  onChange={handleChange}
                  value={state}
                  error={errorsOne[`addresses.${index}.state`]}
                >
                  <option key={0} value="">
                    Selecciona tu estado
                  </option>
                  <option key={1} value="Zacatecas">
                    Zacatecas
                  </option>
                </SelectInput>
                <SelectInput
                  label="Ciudad"
                  name="city"
                  onChange={handleChange}
                  value={city}
                  error={errorsOne[`addresses.${index}.city`]}
                >
                  <option key={0} value="">
                    Selecciona tu ciudad
                  </option>
                  <option key={1} value="Zacatecas">
                    Zacatecas
                  </option>
                  <option key={2} value="Guadalupe">
                    Guadalupe
                  </option>
                </SelectInput>
                <TextInput
                  type="text"
                  label="Código postal"
                  name="postalCode"
                  value={postalCode}
                  handleChange={handleChange}
                  error={errorsOne[`addresses.${index}.postalcode`]}
                />
                <TextInput
                  type="text"
                  label="Teléfono"
                  name="phone"
                  value={phone}
                  handleChange={handleChange}
                  error={errorsOne[`addresses.${index}.phone`]}
                />
              </TwoColumnsModal>
              <TextInput
                type="text"
                label="Colonia"
                name="suburb"
                value={suburb}
                handleChange={handleChange}
                error={errorsOne[`addresses.${index}.suburb`]}
              />
              <TextInput
                type="text"
                label="Dirección"
                name="addressInput"
                value={addressInput}
                handleChange={handleChange}
                error={errorsOne[`addresses.${index}.address`]}
              />
              <TextInput
                textarea
                type="text"
                label="Referencias"
                name="references"
                value={references}
                handleChange={handleChange}
                error={errorsOne[`addresses.${index}.references`]}
              />
              <TextInput
                type="text"
                textarea
                label="Instrucciones de entrega"
                name="instructions"
                value={instructions}
                handleChange={handleChange}
                error={errorsOne[`addresses.${index}.instructions`]}
              />
              <CustomButton
                primary
                type="submit"
                loading={loading.firstLoader}
                disabled={loading.firstLoader}
              >
                Actualizar dirección
              </CustomButton>
            </EditForm>
          </Modal>
        )}
        {open === 'delete' && (
          <Modal handleClose={handleClose}>
            <Message
              type="error"
              title="Cuidado"
              text="¿Seguro que quieres eliminar esta dirección?"
              button="Continuar"
              handleClose={handleClose}
              handleAction={handleDelete}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default ShippingCard;
