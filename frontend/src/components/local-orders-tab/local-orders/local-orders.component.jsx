import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/es-us';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, clearOrders } from '../../../redux/orders/ordersActions';

// COMPONENTS
import LocalOrderCard from '../local-order-card/local-order-card.component';

// STYLES
import {
  Container,
  Content,
  DateTitle,
  PaginationModified,
} from './local-orders.styles';
import { LoaderModified } from '../../../general.styles';
import { Fragment } from 'react';

const LocalOrders = ({ active }) => {
  // ------------------------------ STATE AND CONSTANTS --------------------
  // console.log('Entra');
  const [page, setPage] = useState(sessionStorage.getItem('page') || 1);
  const dispatch = useDispatch();
  const { orders, pages } = useSelector((state) => state.orders);
  const {
    loading: { fetchLoader },
  } = useSelector((state) => state.ui);

  // ---------------------------- USE EFFECTs --------------------------
  useEffect(() => {
    dispatch(fetchOrders(active, 9, page));
    return () => {
      dispatch(clearOrders());
    };
  }, [dispatch, active, page]);

  // -------------------------- HANDLERS ---------------------------

  return (
    <>
      <Container>
        {fetchLoader ? (
          <LoaderModified />
        ) : (
          <Content>
            {orders.map((order, index) => {
              const formatedDate = moment(order.date).calendar(null, {
                lastDay: '[Ayer]',
                sameDay: '[Hoy]',
                nextDay: '[Mañana]',
                lastWeek: '[Ultimo] dddd',
                nextWeek: '[Siguiente] dddd',
                sameElse: 'll',
              });
              const previousFormatedDate =
                index - 1 >= 0
                  ? moment(orders[index - 1].date).calendar(null, {
                      lastDay: '[Ayer]',
                      sameDay: '[Hoy]',
                      nextDay: '[Mañana]',
                      lastWeek: '[Ultimo] dddd',
                      nextWeek: '[Siguiente] dddd',
                      sameElse: 'll',
                    })
                  : '';
              return (
                <Fragment key={order._id}>
                  {formatedDate !== previousFormatedDate && (
                    <DateTitle>{formatedDate}</DateTitle>
                  )}
                  <LocalOrderCard order={order} />
                </Fragment>
              );
            })}
          </Content>
        )}
        <PaginationModified page={page} numOfPages={pages} setPage={setPage} />
      </Container>
    </>
  );
};

export default LocalOrders;
