import React, { useState, useEffect, Fragment } from 'react';
import es from 'date-fns/locale/es';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import getHours from 'date-fns/getHours';
import getDay from 'date-fns/getDay';
import addDays from 'date-fns/addDays';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AnimatePresence } from 'framer-motion';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { clearUiErrors, clearSuccess } from '../../../redux/ui/uiActions';
import {
  createLocalOrder,
  updateLocalOrder,
} from '../../../redux/local-orders/local-orders-actions';

// COMPONENTS
import TextInput from '../../form-inputs/text-input/text-input.component';
import SelectInput from '../../form-inputs/select-input/select-input.component';
import CustomButton from '../../custom-button/custom-button.component';
import AddCard from '../add-card/add-card.component';
import Calendar from '../../calendar/calendar.component';
import {
  CalendarContainer,
  CustomMonthHeader,
} from '../../calendar/calendar.components';
import Modal from '../../modal/modal.component';
import { Alert } from '../../../general.styles';

// STYLES
import { Title, Line } from '../tab-styles';
import {
  Container,
  Content,
  FormContainer,
  ProductRow,
  ProductPrice,
  ExtraRow,
} from './create-local-order.styles';

registerLocale('es', es);

const getAvailableDate = (date) => {
  if (getDay(date) === 0) {
    // Check if sunday
    return setHours(addDays(date, 1), 0);
  } else if (getDay(date) === 6) {
    // Check if saturday
    if (getHours(date) >= 11) return setHours(addDays(date, 1), 0);
  } else {
    if (getHours(date) >= 16) return setHours(addDays(date, 1), 0);
  }

  return date;
};

const CreateLocalOrderTab = ({
  variants,
  update = false,
  order = null,
  setTab,
}) => {
  // ------------------------------------- STATE AND CONSTANTS ----------------------
  const dispatch = useDispatch();
  const {
    uiErrors: { errorsOne },
    loading,
    success,
  } = useSelector((state) => state.ui);

  const [selectedDate, setSelectedDate] = useState(
    order ? new Date(order.date) : getAvailableDate(new Date())
  );
  // console.log(selectedDate.toISOString());

  const [products, setProducts] = useState(
    order
      ? order.products
      : [
          {
            product: '',
            quantity: '0',
            price: '0',
            totalPrice: 0,
          },
        ]
  );

  const [userCredentials, setUserCredentials] = useState({
    clientName: order ? order.clientName : '',
    clientEmail: order ? order.clientEmail : '',
    clientCellphone: order ? order.clientCellphone : '',
    employeeName: order ? order.employeeName : '',
    description: order ? order.description : '',
    percentage: order ? order.percentage : '0',
    paid: order ? order.paid : '0',
    totalPrice: order ? Number(order.totalPrice) : 0,
  });

  const {
    clientName,
    clientEmail,
    clientCellphone,
    employeeName,
    description,
    percentage,
    paid,
    totalPrice,
  } = userCredentials;

  // --------------------------------- USE EFFECTS -------------------------
  useEffect(() => {
    return () => {
      dispatch(clearUiErrors());
    };
  }, [dispatch]);

  // ---------------------------------- HANDLERS ----------------------------

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() + 120 * 60000 < selectedDate.getTime();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'percentage') {
      let newTotalPrice = products.reduce(
        (total, currentProduct) => total + Number(currentProduct.totalPrice),
        0
      );
      // newTotalPrice = Number(newTotalPrice);
      newTotalPrice += Math.round(newTotalPrice * (value / 100) * 100) / 100;

      setUserCredentials({
        ...userCredentials,
        percentage: value,
        totalPrice: Math.round(newTotalPrice * 100) / 100,
      });
    } else {
      setUserCredentials({
        ...userCredentials,
        [name]: value,
      });
    }
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        product: '',
        quantity: '0',
        price: '0',
        totalPrice: 0,
      },
    ]);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = products.slice();
    newProducts.splice(index, 1);
    setProducts(newProducts);

    let newTotalPrice = newProducts.reduce(
      (total, currentProduct) => total + Number(currentProduct.totalPrice),
      0
    );

    newTotalPrice += (newTotalPrice * (Number(percentage) / 100) * 100) / 100;

    setUserCredentials({
      ...userCredentials,
      totalPrice: Math.round(newTotalPrice * 100) / 100,
    });
  };

  const handleProductChange = (event, index) => {
    const { name, value } = event.target;
    const newProducts = products.slice(); //copy the array
    newProducts[index][name] = value;

    if (name === 'quantity' || name === 'price') {
      newProducts[index].totalPrice =
        Math.round(
          Number(newProducts[index].price) *
            Number(newProducts[index].quantity) *
            100
        ) / 100;

      let newTotalPrice = newProducts.reduce(
        (total, currentProduct) => total + Number(currentProduct.totalPrice),
        0
      );

      newTotalPrice += (newTotalPrice * (Number(percentage) / 100) * 100) / 100;

      setUserCredentials({
        ...userCredentials,
        totalPrice: Math.round(newTotalPrice * 100) / 100,
      });
    }
    setProducts(newProducts); //set the new state
  };

  const handleSubmitCreate = (e) => {
    e.preventDefault();
    dispatch(
      createLocalOrder(
        clientName,
        clientCellphone,
        clientEmail,
        employeeName,
        description,
        totalPrice,
        paid,
        percentage,
        selectedDate,
        products
      )
    );
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateLocalOrder(
        order._id,
        clientName,
        clientCellphone,
        clientEmail,
        employeeName,
        description,
        totalPrice,
        paid,
        percentage,
        selectedDate,
        products
      )
    );
  };

  const handleClose = () => {
    dispatch(clearSuccess());
  };

  const handleTabChange = () => {
    dispatch(clearSuccess());
    if (!update) {
      setTab('Ordenes activas');
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <Container
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <Content>
          <FormContainer
            onSubmit={update ? handleSubmitUpdate : handleSubmitCreate}
          >
            {/* ----------------------------- INFORMATION ------------------------- */}

            <Title>Información</Title>
            <TextInput
              name="clientName"
              type="text"
              handleChange={handleChange}
              value={clientName}
              label="Nombre de cliente"
              error={errorsOne.clientName}
            />
            <TextInput
              name="clientCellphone"
              type="text"
              handleChange={handleChange}
              value={clientCellphone}
              label="Teléfono de cliente"
              error={errorsOne.clientCellphone}
            />
            <TextInput
              name="clientEmail"
              type="text"
              handleChange={handleChange}
              value={clientEmail}
              label="Email de cliente"
              error={errorsOne.clientEmail}
            />
            <SelectInput
              label="Nombre de quien atiende"
              name="employeeName"
              onChange={handleChange}
              value={employeeName}
              defaultValue={order ? order.employeeName : ''}
              error={errorsOne.employeeName}
            >
              <option value="">Selecciona uno</option>
              <option value="Gael">Gael</option>
              <option value="José de Jesús">José de Jesús</option>
              <option value="Jassiel">Jassiel</option>
              <option value="Miguel Muñoz">Miguel Muñoz</option>
              <option value="Miguel Antonio">Miguel Antonio</option>
              <option value="María">María</option>
            </SelectInput>
            <TextInput
              textarea
              name="description"
              type="text"
              handleChange={handleChange}
              value={description}
              label="Descripción"
              error={errorsOne.description}
            />
            {/* ----------------------------- PRODUCTS ------------------------- */}
            <Title>Productos</Title>
            {products.map((product, index) => {
              return (
                <Fragment key={index}>
                  <ProductRow>
                    <TextInput
                      name="product"
                      type="text"
                      handleChange={(event) =>
                        handleProductChange(event, index)
                      }
                      value={product.product}
                      label="Producto"
                      error={errorsOne[`products.${index}.product`]}
                    />
                    <TextInput
                      name="quantity"
                      type="text"
                      handleChange={(event) =>
                        handleProductChange(event, index)
                      }
                      value={product.quantity}
                      label="Cantidad"
                      error={errorsOne[`products.${index}.quantity`]}
                    />

                    <TextInput
                      name="price"
                      type="text"
                      handleChange={(event) =>
                        handleProductChange(event, index)
                      }
                      value={product.price}
                      label="Precio"
                      error={errorsOne[`products.${index}.price`]}
                    />
                    <ProductPrice>{`Subtotal: $${product.totalPrice}`}</ProductPrice>
                    {index > 0 && (
                      <CustomButton
                        danger
                        type="button"
                        style={{ justifySelf: 'stretch' }}
                        onClick={() => handleRemoveProduct(index)}
                      >
                        Eliminar
                      </CustomButton>
                    )}
                  </ProductRow>
                  <Line style={{ margin: '0' }} />
                </Fragment>
              );
            })}
            <ExtraRow>
              <TextInput
                name="paid"
                type="text"
                handleChange={handleChange}
                value={paid}
                label="Pagado"
                error={errorsOne.paid}
              />
              <TextInput
                name="percentage"
                type="text"
                handleChange={handleChange}
                value={percentage}
                label="Porcentaje añadido (%)"
                error={errorsOne.percentage}
              />
            </ExtraRow>
            <Title
              style={{ textAlign: 'center' }}
            >{`Total: $${totalPrice}`}</Title>
            <AddCard handler={handleAddProduct} />
            {/* ----------------------------- DELIVERY DATE ------------------------- */}
            <Title>Fecha de entrega</Title>
            <Calendar
              className="animate__animated animate__zoomIn"
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => {
                return CustomMonthHeader(
                  date,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled
                );
              }}
              calendarContainer={CalendarContainer}
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              inline
              showTimeSelect
              locale="es"
              timeFormat="h:mm aaa"
              timeCaption={'Horario'}
              timeIntervals={30}
              minDate={
                getHours(new Date()) >= 16 ? addDays(new Date(), 1) : new Date()
              }
              maxDate={addDays(new Date(), 29)}
              minTime={
                getDay(selectedDate) !== 6
                  ? setHours(setMinutes(new Date(), 30), 9)
                  : setHours(setMinutes(new Date(), 30), 9)
              }
              maxTime={
                getDay(selectedDate) !== 6
                  ? setHours(setMinutes(new Date(), 30), 18)
                  : setHours(setMinutes(new Date(), 30), 13)
              }
              filterDate={(date) => date.getDay() !== 0}
              filterTime={filterPassedTime}
              dateFormat="MMMM d, yyyy h:mm aa"
              error={errorsOne.date}
            />

            <CustomButton
              primary
              loading={loading.firstLoader}
              disabled={loading.secondLoader || loading.firstLoader}
            >
              {update ? 'Actualizar orden' : 'Crear orden'}
            </CustomButton>
          </FormContainer>
        </Content>
      </Container>
      <AnimatePresence exitBeforeEnter>
        {success && (
          <Modal handleClose={handleClose}>
            <Alert
              title="!Exito¡"
              text={`Orden ${update ? 'actualizada' : 'creada'} correctamente`}
              button="Continuar"
              type="success"
              handleClose={handleClose}
              handleAction={handleTabChange}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default CreateLocalOrderTab;
