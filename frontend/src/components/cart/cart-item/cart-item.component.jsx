import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// REDUX
import { useDispatch } from 'react-redux';
import { setCart } from '../../../redux/cart/cartActions';

// COMPONENTS
import QuantityInput from '../../form-inputs/quantity-input/quantity-input.component';
import CustomButton from '../../custom-button/custom-button.component';
import DecorationCard from '../../decoration-card/decoration-card.component';

// STYLES
import {
  Content,
  ImageContainer,
  InfoContainer,
  QuantityContainer,
  PriceContainer,
  Image,
  Title,
  Detail,
  ColorDot,
  SizeItem,
  Price,
  InfoSubContainer,
  Quantity,
} from './cart-item.styles';

const CartItem = ({
  cartProduct: {
    product,
    name,
    slug,
    for: forString,
    colorname,
    image,
    size,
    quantity,
    price,
  },
  disabled = false,
}) => {
  // --------------------------------- STATE AND CONSTANTS ----------------------
  const [limit, setLimit] = useState(0);

  const dispatch = useDispatch();

  // ---------------------------------- USE EFFECTS ---------------------------

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/v1/products/${product}`);
      for (let color of data.data.subcategory.color) {
        if (color.colorname === colorname) {
          for (let colorSize of color.sizes) {
            if (colorSize.size === size) {
              setLimit(colorSize.quantity);
              break;
            }
          }
          break;
        }
      }
    };
    fetchProduct();
  }, [colorname, product, size]);

  // -------------------------------- HANDLERS -------------------------------

  const deleteFromCart = () => {
    dispatch(setCart(product, colorname, size, quantity * -1));
  };

  const incHandler = () => {
    dispatch(setCart(product, colorname, size, 1));
  };
  const decHandler = () => {
    dispatch(setCart(product, colorname, size, -1));
  };

  return (
    <DecorationCard>
      <Content>
        <ImageContainer>
          <Image
            src={`https://copiasnoe-ecommerce.s3.amazonaws.com/products/${image}`}
            alt="producto"
          />
        </ImageContainer>
        <InfoContainer>
          <Title to={`/producto/${slug}`} as={Link}>
            {name}
          </Title>
          <InfoSubContainer>
            {forString !== 'general' && <Detail>Para: {forString}</Detail>}
            <Detail>
              Color:
              <ColorDot color={`#${colorname}`} />
            </Detail>
            {size !== 'general' && (
              <Detail>
                Talla:
                <SizeItem className={'selected'}>{size}</SizeItem>
              </Detail>
            )}
          </InfoSubContainer>
        </InfoContainer>
        <QuantityContainer>
          <Title>Cantidad</Title>
          {disabled ? (
            <Quantity>{quantity}</Quantity>
          ) : (
            <QuantityInput
              quantity={quantity}
              limit={limit}
              incHandler={incHandler}
              decHandler={decHandler}
              required
              disabled
            />
          )}
          {!disabled && (
            <CustomButton danger onClick={deleteFromCart}>
              Eliminar
            </CustomButton>
          )}
        </QuantityContainer>
        <PriceContainer>
          <Title>Precio</Title>
          <Price>{`$${price}`}</Price>
        </PriceContainer>
      </Content>
    </DecorationCard>
  );
};

export default CartItem;
