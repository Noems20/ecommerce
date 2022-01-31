import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import moment from 'moment';
import { Link } from 'react-router-dom';
import 'moment/locale/es-us';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { clearUiErrors } from '../../redux/ui/uiActions';
import {
  updateOrderAddress,
  cancelMyOrder,
} from '../../redux/orders/orders-actions';

// COMPONENTS
import Modal from '../modal/modal.component';
import { Alert } from '../../general.styles';
import TextInput from '../form-inputs/text-input/text-input.component';
import SelectInput from '../form-inputs/select-input/select-input.component';
import CustomButton from '../custom-button/custom-button.component';

// ICONS
import { FaEnvelope } from 'react-icons/fa';

// STYLES
import {
  // PRODUCTS
  Card,
  CardHeader,
  CardHeaderInfo,
  CardHeaderTitle,
  CardHeaderText,
  CardBody,
  Body,
  Column,
  CardBodyTitle,
  CardBodyProducts,
  ButtonsContainer,
  Content,
  ImageContainer,
  InfoContainer,
  QuantityContainer,
  Image,
  Title,
  Detail,
  ColorDot,
  SizeItem,
  Group,
  Text,
  InfoSubContainer,
  Line,
  DetailsContainer,
  // ADDRESS
  AddressContainer,
  ShippingCard,
  CardMenu,
  IconContainer,
  ShippingCardHeader,
  State,
  City,
  ShippingCardBody,
  TwoColumns,
  ShippingInfoContainer,
  InfoTitle,
  Info,
  // USER
  UserInfoContainer,
  UserInfo,
  UserPhoto,
  UserData,
  UserText,
  // MODAL
  EditForm,
  FormTitle,
  TwoColumnsModal,
} from './order-card.styles';

// ICONS
import { FaEdit } from 'react-icons/fa';

const OrderCard = ({ order }) => {
  // ------------------------------ STATE AND CONSTANTS ------------
  const [viewDetails, setViewDetails] = useState(false);
  const [open, setOpen] = useState(false);
  const [addressData, setAddressData] = useState({
    state: order.shippingAddress.state,
    city: order.shippingAddress.city,
    suburb: order.shippingAddress.suburb,
    postalCode: order.shippingAddress.postalcode,
    address: order.shippingAddress.address,
    phone: order.shippingAddress.phone,
    references: order.shippingAddress.references,
    instructions: order.shippingAddress.instructions,
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
  } = useSelector((state) => state.ui);

  const { user } = useSelector((state) => state.user);

  const variants = {
    hidden: {
      height: 0,
      transition: {
        ease: 'easeInOut',
      },
    },
    visible: {
      height: 'auto',
      transition: {
        ease: 'easeInOut',
      },
    },
  };

  // -------------------------------- HANDLERS ------------------
  const handleClose = () => {
    setOpen(false);
    setAddressData({
      state: order.shippingAddress.state,
      city: order.shippingAddress.city,
      suburb: order.shippingAddress.suburb,
      postalCode: order.shippingAddress.postalcode,
      address: order.shippingAddress.address,
      phone: order.shippingAddress.phone,
      references: order.shippingAddress.references,
      instructions: order.shippingAddress.instructions,
    });
    dispatch(clearUiErrors());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateOrderAddress(
        order._id,
        state,
        city,
        suburb,
        postalCode,
        address,
        phone,
        references,
        instructions
      )
    );
  };

  const handleDelete = () => {
    dispatch(cancelMyOrder(order._id));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAddressData({ ...addressData, [name]: value });
  };

  return (
    <>
      <Card>
        {/* -------------------------------------------------------------- */}
        {/* CARD HEADER */}
        {/* -------------------------------------------------------------- */}
        <CardHeader>
          <CardHeaderInfo>
            <CardHeaderTitle>Pedido Realizado</CardHeaderTitle>
            <CardHeaderText>
              {moment(order.createdAt).format('LL')}
            </CardHeaderText>
          </CardHeaderInfo>
          <CardHeaderInfo>
            <CardHeaderTitle>Total</CardHeaderTitle>
            <CardHeaderText>{`$${order.totalPrice}`}</CardHeaderText>
          </CardHeaderInfo>
          <CardHeaderInfo>
            <CardHeaderTitle>Número de pedido</CardHeaderTitle>
            <CardHeaderText>D01-0211037-6985875</CardHeaderText>
          </CardHeaderInfo>
        </CardHeader>
        {/* -------------------------------------------------------------- */}
        {/* CARD BODY */}
        {/* -------------------------------------------------------------- */}
        <CardBody>
          <Body>
            <Column>
              <CardBodyTitle style={{ color: 'var(--color-primary)' }}>
                {order.status}
              </CardBodyTitle>
              <CardBodyTitle>
                Entrega aproximada:{' '}
                {moment(order.createdAt).add(3, 'days').format('LL')}
              </CardBodyTitle>
              {/* ---------------------------------------*/}
              {/* PRODUCTS */}
              {/* --------------------------------------- */}
              <CardBodyProducts>
                {order.orderItems.map((orderItem, index) => {
                  return (
                    <Content key={orderItem._id}>
                      <ImageContainer>
                        <Image
                          src={`https://copiasnoe-ecommerce.s3.amazonaws.com/products/${orderItem.image}`}
                          alt="producto"
                        />
                      </ImageContainer>
                      <InfoContainer>
                        <Title to={`/producto/${orderItem.slug}`} as={Link}>
                          {orderItem.name}
                        </Title>
                        <InfoSubContainer>
                          {orderItem.for !== 'general' && (
                            <Detail>Para: {orderItem.for}</Detail>
                          )}
                          <Detail>
                            Color:
                            <ColorDot color={`#${orderItem.colorname}`} />
                          </Detail>
                          {orderItem.size !== 'general' && (
                            <Detail>
                              Talla:
                              <SizeItem className={'selected'}>
                                {orderItem.size}
                              </SizeItem>
                            </Detail>
                          )}
                        </InfoSubContainer>
                      </InfoContainer>
                      <QuantityContainer>
                        <Group>
                          <Title>Precio</Title>
                          <Text>{`$${orderItem.price}`}</Text>
                        </Group>
                        <Group>
                          <Title>Cantidad</Title>
                          <Text>{orderItem.quantity}</Text>
                        </Group>
                        <Group>
                          <Title>Precio total</Title>
                          <Text>{`$${orderItem.totalprice}`}</Text>
                        </Group>
                      </QuantityContainer>
                      {index < order.orderItems.length - 1 && <Line />}
                    </Content>
                  );
                })}
              </CardBodyProducts>
            </Column>
            {/* ---------------------------------------*/}
            {/* SHIPPING ADDRESS */}
            {/* --------------------------------------- */}
            <ButtonsContainer>
              {/* {(order.status === 'Pedido recibido' ||
                user.role === 'admin') && ( */}
              {user.role === 'admin' && (
                <CustomButton danger onClick={() => setOpen('delete')}>
                  Cancelar pedido
                </CustomButton>
              )}
              <CustomButton
                primary
                onClick={() => setViewDetails(!viewDetails)}
                style={{ gridColumn: '1 / -1' }}
              >
                {viewDetails ? 'Ocultar detalles' : 'Ver detalles'}
              </CustomButton>
            </ButtonsContainer>
          </Body>
          <AnimatePresence>
            {viewDetails && (
              <DetailsContainer
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <AddressContainer>
                  <CardBodyTitle>Dirección de envio</CardBodyTitle>
                  <ShippingCard>
                    {((order.status !== 'En camino' &&
                      order.status !== 'Entregado') ||
                      user.role === 'admin') && (
                      <CardMenu>
                        <IconContainer edit onClick={() => setOpen('edit')}>
                          <FaEdit />
                        </IconContainer>
                      </CardMenu>
                    )}
                    <ShippingCardHeader>
                      <State>{order.shippingAddress.state}</State>
                      <City>{order.shippingAddress.city}</City>
                    </ShippingCardHeader>
                    <ShippingCardBody>
                      <TwoColumns>
                        <ShippingInfoContainer>
                          <InfoTitle>Colonia</InfoTitle>
                          <Info>{order.shippingAddress.suburb}</Info>
                        </ShippingInfoContainer>
                        <ShippingInfoContainer>
                          <InfoTitle>Dirección</InfoTitle>
                          <Info>{order.shippingAddress.address}</Info>
                        </ShippingInfoContainer>
                        <ShippingInfoContainer>
                          <InfoTitle>Codigo postal</InfoTitle>
                          <Info>{order.shippingAddress.postalcode}</Info>
                        </ShippingInfoContainer>
                        <ShippingInfoContainer>
                          <InfoTitle>Teléfono</InfoTitle>
                          <Info>{order.shippingAddress.phone}</Info>
                        </ShippingInfoContainer>
                      </TwoColumns>
                      {order.shippingAddress.references && (
                        <ShippingInfoContainer>
                          <InfoTitle>Referencias</InfoTitle>
                          <Info>{order.shippingAddress.references}</Info>
                        </ShippingInfoContainer>
                      )}
                      {order.shippingAddress.instructions && (
                        <ShippingInfoContainer>
                          <InfoTitle>Instrucciones de entrega</InfoTitle>
                          <Info>{order.shippingAddress.instructions}</Info>
                        </ShippingInfoContainer>
                      )}
                    </ShippingCardBody>
                  </ShippingCard>
                </AddressContainer>
                {/* ---------------------------------------------- */}
                {/* USER INFO */}
                {/* ---------------------------------------------- */}
                {user.role === 'admin' && (
                  <UserInfoContainer>
                    <CardBodyTitle>Usuario</CardBodyTitle>
                    <UserInfo>
                      <UserPhoto
                        url={`https://copiasnoe-ecommerce.s3.amazonaws.com/users/${order.user.photo}`}
                      />
                      <UserData>
                        <UserText>
                          <h1>{order.user.name}</h1>
                        </UserText>
                        <UserText>
                          <FaEnvelope /> <p>{order.user.email}</p>
                        </UserText>
                      </UserData>
                    </UserInfo>
                  </UserInfoContainer>
                )}
              </DetailsContainer>
            )}
          </AnimatePresence>
        </CardBody>
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
                  error={errorsOne['shippingAddress.state']}
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
                  error={errorsOne['shippingAddress.city']}
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
                  error={errorsOne['shippingAddress.postalcode']}
                />
                <TextInput
                  type="text"
                  label="Teléfono"
                  name="phone"
                  value={phone}
                  handleChange={handleChange}
                  error={errorsOne['shippingAddress.phone']}
                />
              </TwoColumnsModal>
              <TextInput
                type="text"
                label="Colonia"
                name="suburb"
                value={suburb}
                handleChange={handleChange}
                error={errorsOne['shippingAddress.suburb']}
              />
              <TextInput
                type="text"
                label="Dirección"
                name="address"
                value={address}
                handleChange={handleChange}
                error={errorsOne['shippingAddress.address']}
              />
              <TextInput
                textarea
                type="text"
                label="Referencias"
                name="references"
                value={references}
                handleChange={handleChange}
                error={errorsOne['shippingAddress.references']}
              />
              <TextInput
                type="text"
                textarea
                label="Instrucciones de entrega"
                name="instructions"
                value={instructions}
                handleChange={handleChange}
                error={errorsOne['shippingAddress.instructions']}
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
            <Alert
              // style={{ maxWidth: '50vw' }}
              type="error"
              title="Cuidado"
              text="¿Seguro que deseas cancelar esta orden?
              Se te sera rembolsado tu pago en los proximos 7 días"
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

export default OrderCard;
