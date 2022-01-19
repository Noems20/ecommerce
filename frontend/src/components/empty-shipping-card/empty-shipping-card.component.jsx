import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { setAddresses } from '../../redux/addresses/addressesActions';
import { clearUiErrors, clearSuccess } from '../../redux/ui/uiActions';

// COMPONENTS
import Modal from '../modal/modal.component';
import TextInput from '../form-inputs/text-input/text-input.component';
import SelectInput from '../form-inputs/select-input/select-input.component';
import CustomButton from '../custom-button/custom-button.component';

// STYLES
import {
  Card,
  Add,
  AddText,
  EditForm,
  FormTitle,
  TwoColumnsModal,
} from './empty-shipping-card.styles';

// ICONS
import { BsPlusCircle } from 'react-icons/bs';

const EmptyShippingCard = ({ index }) => {
  // ----------------------------- STATE AND CONSTANTS ----------------
  const [open, setOpen] = useState(false);
  // const [city, setCity] = useState('');
  const [addressData, setAddressData] = useState({
    state: '',
    city: '',
    suburb: '',
    postalCode: '',
    address: '',
    phone: '',
    references: '',
    instructions: '',
  });

  const {
    state,
    city,
    suburb,
    postalCode,
    address,
    phone,
    references,
    instructions,
  } = addressData;

  const dispatch = useDispatch();
  const {
    uiErrors: { errorsOne },
    loading,
    success,
  } = useSelector((state) => state.ui);

  // ---------------------------------- USE EFFECT'S ---------------------------
  useEffect(() => {
    if (success) {
      setOpen(false);
      setAddressData({
        state: '',
        city: '',
        suburb: '',
        postalCode: '',
        address: '',
        phone: '',
        references: '',
        instructions: '',
      });
      dispatch(clearUiErrors());
      dispatch(clearSuccess());
    }
  }, [success, dispatch]);
  // ---------------------------------- HANDLERS ---------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;

    setAddressData({ ...addressData, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(clearUiErrors());
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
        address,
        references,
        instructions
      )
    );
  };

  return (
    <>
      <Card onClick={() => setOpen(true)}>
        <Add>
          <AddText>Añadir dirección</AddText>
          <BsPlusCircle />
        </Add>
      </Card>

      <AnimatePresence>
        {open && (
          <Modal handleClose={handleClose}>
            <EditForm onSubmit={handleSubmit}>
              <FormTitle>Añadir dirección</FormTitle>
              <TwoColumnsModal>
                <SelectInput
                  label='Estado'
                  name='state'
                  onChange={handleChange}
                  value={state}
                  error={errorsOne[`addresses.${index}.state`]}
                >
                  <option key={0} value=''>
                    Selecciona tu estado
                  </option>
                  <option key={1} value='Zacatecas'>
                    Zacatecas
                  </option>
                </SelectInput>
                <SelectInput
                  label='Ciudad'
                  name='city'
                  onChange={handleChange}
                  value={city}
                  error={errorsOne[`addresses.${index}.city`]}
                >
                  <option key={0} value=''>
                    Selecciona tu ciudad
                  </option>
                  <option key={1} value='Zacatecas'>
                    Zacatecas
                  </option>
                  <option key={2} value='Guadalupe'>
                    Guadalupe
                  </option>
                </SelectInput>
                <TextInput
                  type='text'
                  label='Código postal'
                  name='postalCode'
                  value={postalCode}
                  handleChange={handleChange}
                  error={errorsOne[`addresses.${index}.postalcode`]}
                />
                <TextInput
                  type='text'
                  label='Teléfono'
                  name='phone'
                  value={phone}
                  handleChange={handleChange}
                  error={errorsOne[`addresses.${index}.phone`]}
                />
              </TwoColumnsModal>
              <TextInput
                type='text'
                label='Colonia'
                name='suburb'
                value={suburb}
                handleChange={handleChange}
                error={errorsOne[`addresses.${index}.suburb`]}
              />
              <TextInput
                type='text'
                label='Dirección'
                name='address'
                value={address}
                handleChange={handleChange}
                error={errorsOne[`addresses.${index}.address`]}
              />
              <TextInput
                textarea
                type='text'
                label='Referencias'
                name='references'
                value={references}
                handleChange={handleChange}
                error={errorsOne[`addresses.${index}.references`]}
              />
              <TextInput
                type='text'
                textarea
                label='Instrucciones de entrega'
                name='instructions'
                value={instructions}
                handleChange={handleChange}
                error={errorsOne[`addresses.${index}.instructions`]}
              />
              <CustomButton
                primary
                type='submit'
                loading={loading.firstLoader}
                disabled={loading.firstLoader}
              >
                Añadir dirección
              </CustomButton>
            </EditForm>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default EmptyShippingCard;
