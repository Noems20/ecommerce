import React, { useState, useEffect } from 'react';
import axios from 'axios';

// COMPONENTS
import OrderCard from '../../order-card/order-card.component';

// STYLES
import { Container, ModifiedTitle, OrdersContainer } from './orders-tab.styles';

const OrdersTab = ({ variants, status }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get('/api/v1/orders/my-orders');
      setOrders(data.data);
      return data.data;
    };

    fetchOrders();
  }, [setOrders]);

  console.log(orders);

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
        {orders.map((order) => {
          return <OrderCard key={order._id} order={order} />;
        })}
      </OrdersContainer>
    </Container>
  );
};

export default OrdersTab;
