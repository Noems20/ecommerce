import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../redux/cart/cartActions';

// COMPONENTS
import CustomButton from '../custom-button/custom-button.component';
import Rating from '../rating/rating.component';
import ImageMagnifier from '../image-magnifier/image-magnifier.component';
import QuantityInput from '../form-inputs/quantity-input/quantity-input.component';

// STYLES
import {
  ProductContainer,
  ImageContainer,
  SecondaryImagesContainer,
  ProductImage,
  InfoContainer,
  ProductTitle,
  ForTitle,
  DetailsTitle,
  ProductPrice,
  DetailsContainer,
  ColorItemsContainer,
  SizeItemsContainer,
  ColorDot,
  InfoTitle,
  Description,
  DescriptionText,
  List,
  ListItem,
  SizeItem,
} from './product.styles';

const Product = ({ product }) => {
  // --------------------------------- STATE AND CONSTANTS ----------------------------
  const history = useHistory();
  const [qty, setQty] = useState(1);
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    product.subcategory.color[0]
  );
  const [selectedColor, setSelectedColor] = useState(
    `#${selectedSubCategory.colorname}`
  );
  const [focusImage, setFocusImage] = useState(selectedSubCategory.image);
  const [selectedSize, setSelectedSize] = useState(
    selectedSubCategory.sizes[0].size
  );
  const [collapse, setCollapse] = useState(false);
  const [limit, setLimit] = useState(selectedSubCategory.sizes[0].quantity);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const imageVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    hover: {
      scale: 1.1,
      boxShadow: '0 0 8px #5e5e5e',
    },
  };

  // ------------------------------ USE EFFECT'S --------------------------------
  useEffect(() => {
    if (window.innerWidth <= 1000) {
      setCollapse(true);
    } else {
      setCollapse(false);
    }

    function handleResize() {
      if (window.innerWidth <= 1000) {
        setCollapse(true);
      } else {
        setCollapse(false);
      }
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // --------------------------------- HANDLERS -------------------------

  const handleQuantityChange = (e) => {
    let { value } = e.target;

    if (value === '') {
      setQty(value);
    } else if (isNaN(value)) {
      setQty(1);
    } else if (Math.round(value) > limit) {
      setQty(limit);
    } else if (Math.round(value) < 1) {
      setQty(1);
    } else {
      setQty(Math.round(value));
    }
  };

  const handleSubcategoryChange = (color) => {
    setSelectedSubCategory(color);
    setSelectedColor(`#${color.colorname}`);
    setFocusImage(color.image);

    let valid = false;
    for (let size of color.sizes) {
      if (size.size === selectedSize && size.quantity > 0) {
        setLimit(size.quantity);
        valid = true;
        if (qty > size.quantity) {
          setQty(size.quantity);
        }
      }
    }

    if (!valid) {
      setSelectedSize(color.sizes[0].size);
      setLimit(color.sizes[0].quantity);
      if (qty > color.sizes[0].quantity) {
        setQty(color.sizes[0].quantity);
      }
    }
  };

  const handleSizeChange = (size) => {
    for (let color of product.subcategory.color) {
      if ('#' + color.colorname === selectedColor) {
        setLimit(size.quantity);
        if (qty > size.quantity) {
          setQty(size.quantity);
        }
      }
    }
    setSelectedSize(size.size);
  };

  const handleAddToCart = () => {
    dispatch(
      setCart(product._id, selectedColor.replace('#', ''), selectedSize, qty)
    );
  };

  const redirectHandler = () => {
    history.push(`/login?redirect=producto/${product.slug}`);
  };

  const productImages = (
    <>
      <ImageContainer>
        <ImageMagnifier
          src={`https://copiasnoe-ecommerce.s3.amazonaws.com/products/${focusImage}`}
          width={'56%'}
        />
      </ImageContainer>
      <SecondaryImagesContainer>
        {product.subcategory.color.length > 1 &&
          product.subcategory.color.map((color, index) => {
            return (
              <ProductImage
                key={color._id}
                src={`https://copiasnoe-ecommerce.s3.amazonaws.com/products/${color.image}`}
                onClick={() => handleSubcategoryChange(color)}
                variants={imageVariants}
                whileHover='hover'
              />
            );
          })}
      </SecondaryImagesContainer>
    </>
  );

  return (
    <ProductContainer>
      {!collapse && productImages}
      <InfoContainer>
        <ProductTitle>{product.name}</ProductTitle>
        {product.for !== 'general' && <ForTitle>{product.for}</ForTitle>}
        <ProductPrice>
          {`$${product.price}`}
          <span>Impuesto incluido.</span>
        </ProductPrice>
        {/* ------------- RATING ------------- */}
        <Rating
          value={product.ratingsAverage}
          text={`${product.ratingsQuantity} ${
            product.ratingsQuantity === 1 ? 'reseña' : 'reseñas'
          }`}
        />
        {/* ------------- COLORS -------------- */}
        {product.subcategory.color.length > 1 && (
          <DetailsContainer>
            <DetailsTitle>Color</DetailsTitle>
            <ColorItemsContainer>
              {product.subcategory.color.map((color, index) => {
                return (
                  <ColorDot
                    key={color._id}
                    color={`#${color.colorname}`}
                    className={
                      selectedColor === `#${color.colorname}` ? 'selected' : ''
                    }
                    onClick={() => handleSubcategoryChange(color)}
                  />
                );
              })}
            </ColorItemsContainer>
          </DetailsContainer>
        )}
        {/* ------------- SIZES -------------- */}
        {selectedSubCategory.sizes.length > 1 && (
          <DetailsContainer>
            <DetailsTitle>Talla</DetailsTitle>
            <SizeItemsContainer>
              {selectedSubCategory.sizes.map((size) => {
                return (
                  size.quantity > 0 && (
                    <SizeItem
                      key={size._id}
                      className={selectedSize === size.size ? 'selected' : ''}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size.size}
                    </SizeItem>
                  )
                );
              })}
            </SizeItemsContainer>
          </DetailsContainer>
        )}
        {/* ------------- CANTIDAD -------------- */}
        <DetailsContainer>
          <DetailsTitle>Cantidad</DetailsTitle>
          <QuantityInput
            quantity={qty}
            limit={limit}
            setQuantity={setQty}
            handleChange={handleQuantityChange}
            required
          />
        </DetailsContainer>
        {/* ------------- ADD TO CART ------------- */}
        {user ? (
          <CustomButton primary onClick={handleAddToCart}>
            Añadir a carrito
          </CustomButton>
        ) : (
          <CustomButton onClick={redirectHandler} primary>
            Añadir a carrito
          </CustomButton>
        )}

        {/* ------------ PRODUCT IMGAES ------------- */}
        {collapse && productImages}
        {/* ------------- DESCRIPTION ------------- */}
        <Description>
          <InfoTitle>Descripción</InfoTitle>
          <DescriptionText>{product.description}</DescriptionText>
        </Description>
        {/* ------------- MEASUREMENTS ------------- */}
        <Description>
          <InfoTitle>Especifiaciones</InfoTitle>
          <List>
            {product.specifications.map((specification, index) => {
              return <ListItem key={index}>{specification}</ListItem>;
            })}
          </List>
        </Description>
      </InfoContainer>
    </ProductContainer>
  );
};

export default Product;
