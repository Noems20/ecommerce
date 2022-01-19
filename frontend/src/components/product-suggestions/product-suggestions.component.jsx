import React, { useEffect } from 'react';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  clearProducts,
} from '../../redux/products/productsActions';

// COMPONENTS
import ProductCard from '../product-card/product-card.component';

// STYLES
import {
  Container,
  ProductSuggestionsTitle,
  ProductsGrid,
} from './product-suggestions.styles';

// IMAGES

const ProductSuggestions = ({ catalog, id }) => {
  // ------------------------------- STATE AND CONSTANTS -------------------
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  // ------------------------------- USE EFFECT'S ---------------------------
  useEffect(() => {
    dispatch(fetchProducts(catalog, 4, 1, '-sold', 1, null, id));
    return () => {
      dispatch(clearProducts());
    };
  }, [dispatch, catalog, id]);

  return (
    <Container>
      <ProductSuggestionsTitle>Te podría interesar</ProductSuggestionsTitle>
      <ProductsGrid>
        {products.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </ProductsGrid>
    </Container>
  );
};

export default ProductSuggestions;
