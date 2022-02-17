import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/es-us';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLocalOrders,
  clearLocalOrders,
} from '../../../redux/local-orders/local-orders-actions';

// COMPONENTS
import LocalOrderCard from '../local-order-card/local-order-card.component';

// STYLES
import {
  Container,
  Content,
  DateTitle,
  PaginationModified,
  EmptyTitle,
} from './local-orders.styles';
import { LoaderModified } from '../../../general.styles';
import { Fragment } from 'react';

const LocalOrders = ({ status, variants }) => {
  // ------------------------------ STATE AND CONSTANTS --------------------
  // console.log('Entra');
  const [page, setPage] = useState(sessionStorage.getItem('page') || 1);
  const dispatch = useDispatch();
  const { orders, pages } = useSelector((state) => state.localOrders);
  const {
    loading: { fetchLoader },
  } = useSelector((state) => state.ui);

  // ---------------------------- USE EFFECTs --------------------------
  useEffect(() => {
    dispatch(fetchLocalOrders(status, 12, page));
    return () => {
      dispatch(clearLocalOrders());
    };
  }, [dispatch, status, page]);

  // -------------------------- HANDLERS ---------------------------

  return (
    <>
      <Container
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {fetchLoader ? (
          <LoaderModified />
        ) : orders.length > 0 ? (
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
        ) : (
          <EmptyTitle>
            No tienes ninguna orden <br /> <span>😓</span>
          </EmptyTitle>
        )}
        <PaginationModified page={page} numOfPages={pages} setPage={setPage} />
      </Container>
    </>
  );
};

export default LocalOrders;
