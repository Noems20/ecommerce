import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProducts,
  fetchClothingProducts,
  clearProducts,
} from '../../redux/products/productsActions';

// COMPONENTS
import ProductCard from '../../components/product-card/product-card.component';
import Rating from '../../components/rating/rating.component';
import Pagination from '../pagination/pagination.component';

// STYLES
import { LoaderModified } from '../../general.styles';
import { ProductsContainer } from './products.styles';

import {
  Products,
  FilterTitle,
  FiltersContainer,
  Filter,
  FilterItem,
  RadioButton,
  ProductsGrid,
} from '../../category-page.styles';

const ProductsSection = ({
  forW = null,
  category = null,
  catalog,
  keyword,
}) => {
  // ------------------------- STATE AND CONSTANTS ---------------
  const [orderBy, setOrderBy] = useState('-sold');
  const [filterRating, setFilterRating] = useState(1);
  const [filterPrice, setFilterPrice] = useState(null);
  const [page, setPage] = useState(sessionStorage.getItem('page') || 1);

  const {
    loading: { fetchLoader },
  } = useSelector((state) => state.ui);

  const { products, pages } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  // -------------------- USE EFFECT'S -------------------
  useEffect(() => {
    if (forW && category) {
      dispatch(
        fetchClothingProducts(
          forW,
          category,
          12,
          page,
          orderBy,
          filterRating,
          filterPrice
        )
      );
    } else {
      dispatch(
        fetchProducts(
          catalog,
          12,
          page,
          orderBy,
          filterRating,
          filterPrice,
          null,
          keyword
        )
      );
    }
    return () => {
      dispatch(clearProducts());
    };
  }, [
    dispatch,
    catalog,
    orderBy,
    filterRating,
    filterPrice,
    category,
    forW,
    page,
    keyword,
  ]);

  return (
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
  );
};

export default ProductsSection;
