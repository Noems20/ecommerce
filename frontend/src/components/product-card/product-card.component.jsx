import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// COMPONENTS
import Rating from '../rating/rating.component';

// STYLES
import './product-card.styles.scss';
import {
  Container,
  Card,
  ImageBox,
  Image,
  ImageLoader,
  ContentBox,
  Title,
  Price,
  Button,
} from './product-card.styles';

const ProductCard = ({ product }) => {
  // ------------------------------------- STATE AND CONSTANTS ------------
  const [imageLoaded, setImageLoaded] = useState(false);
  const containerVariants = {
    hidden: {
      y: '100vh',
      opacity: 0,
      scale: 0,
    },
    visible: {
      y: '0',
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <Container>
      <Card catalog={`${product.catalog}`.slice(0, 4)}>
        <ImageBox>
          <Image
            src={`https://copiasnoe-ecommerce.s3.amazonaws.com/products/${product.subcategory.color[0].image}`}
            className={imageLoaded ? '' : 'hide'}
            onLoad={() => setImageLoaded(true)}
            alt="Product"
          />

          {!imageLoaded && <ImageLoader />}
        </ImageBox>
        <ContentBox>
          <Title>{product.name}</Title>
          <Price>{`$${product.price}`}</Price>
          <Rating
            value={product.ratingsAverage}
            text={`${product.ratingsAverage} de 5`}
          />
          <Button
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            as={Link}
            to={`/producto/${product.slug}`}
          >
            Comprar ahora
          </Button>
        </ContentBox>
      </Card>
    </Container>
  );
};

export default ProductCard;
