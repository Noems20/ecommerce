import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import 'moment/locale/es-us';
import CustomButton from '../custom-button/custom-button.component';

// STYLES
import {
  Card,
  CardHeader,
  CardHeaderInfo,
  CardHeaderTitle,
  CardHeaderText,
  CardBody,
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
} from './order-card.styles';

const OrderCard = ({ order }) => {
  return (
    <Card>
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
      <CardBody>
        <Column>
          <CardBodyTitle>{order.status}</CardBodyTitle>
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

        <ButtonsContainer>
          <CustomButton primary>Actualizar</CustomButton>
          <CustomButton danger>Cancelar pedido</CustomButton>
        </ButtonsContainer>
      </CardBody>
    </Card>
  );
};

export default OrderCard;
