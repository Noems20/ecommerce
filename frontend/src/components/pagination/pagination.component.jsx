import React, { useEffect } from 'react';

// REDUX
import { useSelector } from 'react-redux';

// STYLES
import { Container, Button } from './pagination.styles';

// ICONS
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

const Pagination = ({ page = 1, setPage, numOfPages, className }) => {
  const {
    loading: { fetchLoader },
  } = useSelector((state) => state.ui);

  // ----------------------------- HANDLERS ---------------------
  const handlePage = (num) => {
    const newPage = Number(page) + num;
    setPage(newPage);
    sessionStorage.setItem('page', newPage);
  };

  // -------------------------------- USE EFFECT'S ----------------------
  useEffect(() => {
    const sessionPage = sessionStorage.getItem('page');
    if (sessionPage) setPage(sessionPage);
    return () => {
      sessionStorage.removeItem('page');
    };
  }, [setPage]);

  return (
    !fetchLoader && (
      <Container className={className}>
        <Button
          style={{ visibility: page > 1 ? 'visible' : 'hidden' }}
          onClick={() => page > 1 && handlePage(-1)}
        >
          <FaAngleLeft />
        </Button>

        <Button style={{ visibility: numOfPages > 0 ? 'visible' : 'hidden' }}>
          {page}
        </Button>
        <Button
          style={{ visibility: page < numOfPages ? 'visible' : 'hidden' }}
          onClick={() => page < numOfPages && handlePage(1)}
        >
          <FaAngleRight />
        </Button>
      </Container>
    )
  );
};

export default Pagination;
