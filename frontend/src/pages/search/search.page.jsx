import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProducts,
  clearProducts,
} from '../../redux/products/productsActions';

// COMPONENTS
import ProductCard from '../../components/product-card/product-card.component';
import Rating from '../../components/rating/rating.component';
import Pagination from '../../components/pagination/pagination.component';
import { LoaderModified } from '../../general.styles';

// STYLES
import {
  Products,
  FilterTitle,
  FiltersContainer,
  Filter,
  FilterItem,
  RadioButton,
  ProductsGrid,
} from '../../category-page.styles';

import { PageGrid } from '../../general.styles';
import {
  Container,
  Title,
  NotFoundTitle,
  ProductsContainer,
} from './search.page.styles';

const SearchPage = () => {
  // ----------------------------- STATE AND CONSTANTS -----------------------------
  const { keyword } = useParams();

  const [orderBy, setOrderBy] = useState('-sold');
  const [filterRating, setFilterRating] = useState(1);
  const [filterPrice, setFilterPrice] = useState(null);
  const [page, setPage] = useState(sessionStorage.getItem('page') || 1);

  const {
    loading: { fetchLoader },
  } = useSelector((state) => state.ui);

  const { products, pages } = useSelector((state) => state.products);
  const { success } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  // ----------------------------- USE EFFECT -----------------------------

  useEffect(() => {
    dispatch(
      fetchProducts(
        null,
        12,
        page,
        orderBy,
        filterRating,
        filterPrice,
        null,
        keyword
      )
    );

    return () => {
      dispatch(clearProducts());
    };
  }, [dispatch, orderBy, filterRating, filterPrice, page, keyword]);

  return (
    <PageGrid>
      <Container>
        <Title>Resultados para "{keyword}"</Title>
      </Container>
      <Products>
        <FiltersContainer>
          <Filter>
            <FilterTitle>Opinión media de los clientes</FilterTitle>
            <FilterItem
              onClick={() => setFilterRating(4)}
              className={filterRating === 4 && 'selected'}
            >
              <Rating value={4} />o más
            </FilterItem>
            <FilterItem
              onClick={() => setFilterRating(3)}
              className={filterRating === 3 && 'selected'}
            >
              <Rating value={3} />o más
            </FilterItem>
            <FilterItem
              onClick={() => setFilterRating(2)}
              className={filterRating === 2 && 'selected'}
            >
              <Rating value={2} />o más
            </FilterItem>
            <FilterItem
              onClick={() => setFilterRating(1)}
              className={filterRating === 1 && 'selected'}
            >
              <Rating value={1} />o más
            </FilterItem>
          </Filter>
          <Filter>
            <FilterTitle>Precio</FilterTitle>
            <FilterItem
              onClick={() => setFilterPrice(300)}
              className={filterPrice === 300 && 'selected'}
            >
              Hasta $300
            </FilterItem>
            <FilterItem
              onClick={() => setFilterPrice(400)}
              className={filterPrice === 400 && 'selected'}
            >
              Hasta $400
            </FilterItem>
            <FilterItem
              onClick={() => setFilterPrice(500)}
              className={filterPrice === 500 && 'selected'}
            >
              Hasta $500
            </FilterItem>
            <FilterItem
              onClick={() => setFilterPrice(null)}
              className={filterPrice === null && 'selected'}
            >
              Todos los precios
            </FilterItem>
          </Filter>
          <Filter>
            <FilterTitle>Ordenar por</FilterTitle>
            <FilterItem onClick={() => setOrderBy('price')}>
              <RadioButton className={orderBy === 'price' && 'selected'} />
              Precio: de más bajo a más alto
            </FilterItem>
            <FilterItem onClick={() => setOrderBy('-price')}>
              <RadioButton className={orderBy === '-price' && 'selected'} />
              Precio: de más alto a más bajo
            </FilterItem>
            <FilterItem onClick={() => setOrderBy('-ratingsAverage')}>
              <RadioButton
                className={orderBy === '-ratingsAverage' && 'selected'}
              />
              Opinión media de los clientes
            </FilterItem>
            <FilterItem
              onClick={() => setOrderBy('-sold')}
              className={orderBy === '-sold' && 'selected'}
            >
              <RadioButton className={orderBy === '-sold' && 'selected'} />
              Más vendidos
            </FilterItem>
          </Filter>
        </FiltersContainer>
        <ProductsContainer>
          <AnimatePresence exitBeforeEnter>
            {fetchLoader ? (
              <LoaderModified
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={1}
              />
            ) : success && products.length === 0 ? (
              <NotFoundTitle>
                Oops! Sin resultados <br />
                <span style={{ fontSize: '7rem' }}>😥</span>
              </NotFoundTitle>
            ) : (
              <ProductsGrid
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={2}
              >
                {products.map((product) => {
                  return <ProductCard key={product._id} product={product} />;
                })}
              </ProductsGrid>
            )}
          </AnimatePresence>
          <Pagination page={page} setPage={setPage} numOfPages={pages} />
        </ProductsContainer>
      </Products>
    </PageGrid>
  );
};

export default SearchPage;
