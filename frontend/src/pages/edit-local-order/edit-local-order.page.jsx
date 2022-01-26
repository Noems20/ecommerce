import React, { useEffect } from 'react';
import { useParams } from 'react-router';

// REDUX
import { useDispatch, useSelector } from 'react-redux';

// COMPONENTS
import CreateLocalOrderTab from '../../components/local-orders-tab/create-local-order/create-local-order.component';

// STYLES
import { UserDetailsContainer, Title } from './edit-local-order.styles';
import { PageGrid } from '../../general.styles';
import { fetchSingleLocalOrder } from '../../redux/local-orders/local-orders-actions';
import { LoaderModified } from '../../general.styles';

const EditLocalOrderPage = () => {
  // -------------------- STATE AND CONSTANTS ----------------
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.localOrders);
  const {
    loading: { fetchLoader },
  } = useSelector((state) => state.ui);

  // ---------------------------------- USE EFFECT'S -------------
  useEffect(() => {
    dispatch(fetchSingleLocalOrder(id));
    return () => {};
  }, [dispatch, id]);

  return (
    <PageGrid>
      {/* -------------------------------- HEADER ---------------------- */}
      <UserDetailsContainer>
        <Title>Actualizar orden</Title>
      </UserDetailsContainer>
      {fetchLoader ? (
        <div style={{ gridColumn: 'full-start / full-end' }}>
          <LoaderModified />
        </div>
      ) : (
        order && <CreateLocalOrderTab update={true} order={order} />
      )}
    </PageGrid>
  );
};

export default EditLocalOrderPage;
