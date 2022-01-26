import React, { useEffect } from 'react';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyOrders } from '../../../redux/orders/orders-actions';
import { LoaderModified } from '../../../general.styles';

// COMPONENTS
import OrderCard from '../../order-card/order-card.component';

// STYLES
import {
  Container,
  ModifiedTitle,
  OrdersContainer,
  EmptyTitle,
} from './orders-tab.styles';

const OrdersTab = ({ variants, status }) => {
  // ------------------------------ STATE AND CONSTANTS -------------

  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const { loading } = useSelector((state) => state.ui);

  // ----------------------------- USE EFFECT'S -------------------
  useEffect(() => {
    dispatch(fetchMyOrders(status));
  }, [dispatch, status]);

  // ------------------------------- HANDLERS ---------------------

  return (
    <Container
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <ModifiedTitle>
        {status === 'active' ? 'Pedidos en curso' : 'Historial de pedidos'}
      </ModifiedTitle>
      <OrdersContainer>
        {loading.fetchLoader ? (
          <LoaderModified />
        ) : orders.length > 0 ? (
          orders.map((order) => {
            return <OrderCard key={order._id} order={order} />;
          })
        ) : (
          <EmptyTitle>
            No tienes ningún pedido <br /> <span>😓</span>
          </EmptyTitle>
        )}
      </OrdersContainer>
    </Container>
  );
};

export default OrdersTab;
