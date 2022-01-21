import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// REDUX
import {
  fetchProducts,
  clearProducts,
} from '../../redux/products/productsActions';

import { useSelector, useDispatch } from 'react-redux';

// COMPONENTS
import ProductCard from '../../components/product-card/product-card.component';

// STYLES
import { PageGrid, LoaderModified } from '../../general.styles';
import {
  HeroSection,
  LeftColumn,
  RightColumn,
  HeroTitle,
  HeroSubtitleUp,
  HeroSubtitleDown,
  HeroButton,
  HeroImage,
  Waves,
} from '../../hero.styles';
import {
  CategoriesBar,
  BarItem,
  BarItemContent,
  BackgroundImageContainer,
  BarItemTitle,
  SubTitle,
  Line,
  Title,
  ButtonsContainer,
  CatalogButton,
  ProductsContainer,
  ProductsGrid,
  ServiceInfoContainer,
  ServiceInfoContent,
  ServiceInfoItem,
  ServiceInfoIconContainer,
  ServiceInfoTitle,
  ServiceInfoText,
} from './home.page.styles';

// ICONS
import { FaBox, FaTruck } from 'react-icons/fa';
import { GiTakeMyMoney } from 'react-icons/gi';

// IMAGENES

import waves from '../../dev-images/waves2.svg';
import agenda from '../../dev-images/agenda.png';

import scheduleBackground from './schedule.jpg';
import clothingBackground from './clothing.jpg';
import giftsBackground from './gifts.jpg';
// import bindingBackground from './binding.jpg';

const Home = () => {
  // -------------------- STATE AND CONSTANTS -------------------
  const [selectedCatalog, setSelectedCatalog] = useState('regalos');

  const { products } = useSelector((state) => state.products);
  const {
    loading: { fetchLoader },
  } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };
  // -------------------- USE EFFECT'S -------------------
  useEffect(() => {
    dispatch(fetchProducts(selectedCatalog, 8));
    return () => {
      dispatch(clearProducts());
    };
  }, [selectedCatalog, dispatch]);

  return (
    <PageGrid
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* ---------------------------- HERO ---------------------- */}
      <HeroSection>
        <LeftColumn>
          <HeroSubtitleUp className="animate__animated animate__fadeInDown">
            La mejor relación calidad-precio
          </HeroSubtitleUp>
          <HeroTitle className="animate__animated animate__fadeIn animate__delay-1s">
            Agendas
          </HeroTitle>
          <HeroSubtitleDown className="animate__animated animate__fadeInUp animate__delay-2s">
            Proximamente Agendas Personalizadas
          </HeroSubtitleDown>
          <HeroButton
            to="/agendas"
            className="animate__animated animate__flipInY animate__delay-2s"
          >
            Explorar ahora
          </HeroButton>
        </LeftColumn>

        <RightColumn>
          <Waves src={waves} />
          <HeroImage
            src={agenda}
            className="animate__animated animate__fadeIn animate__delay-3s"
          />
        </RightColumn>
      </HeroSection>
      {/* ---------------------------- CATEGORIES ---------------------- */}
      <CategoriesBar>
        {/* <BarItem className='top' to='/encuadernacion'>
          <BarItemContent>
            <BarItemTitle>Encuadernación</BarItemTitle>
          </BarItemContent>
          <BackgroundImageContainer
            className='background-image'
            imageUrl={bindingBackground}
          />
        </BarItem> */}
        <BarItem to="/agendas" className="top">
          <BarItemContent>
            <BarItemTitle>Agendas</BarItemTitle>
          </BarItemContent>
          <BackgroundImageContainer
            className="background-image"
            imageUrl={scheduleBackground}
          />
        </BarItem>
        <BarItem to="/ropa/general/todo">
          <BarItemContent>
            <BarItemTitle>Ropa</BarItemTitle>
          </BarItemContent>
          <BackgroundImageContainer
            className="background-image"
            imageUrl={clothingBackground}
          />
        </BarItem>
        <BarItem to="/regalos">
          <BarItemContent>
            <BarItemTitle>Regalos</BarItemTitle>
          </BarItemContent>
          <BackgroundImageContainer
            className="background-image"
            imageUrl={giftsBackground}
          />
        </BarItem>
      </CategoriesBar>
      {/* ---------------------------- PRODUCTS ---------------------- */}
      <ProductsContainer>
        <SubTitle>Catálogo</SubTitle>
        <Line />
        <Title>Más vendidos</Title>
        <ButtonsContainer>
          <CatalogButton
            className={selectedCatalog === 'agendas' && 'active'}
            onClick={() => setSelectedCatalog('agendas')}
          >
            Agendas
          </CatalogButton>
          <CatalogButton
            className={selectedCatalog === 'ropa' && 'active'}
            onClick={() => setSelectedCatalog('ropa')}
          >
            Ropa
          </CatalogButton>
          <CatalogButton
            className={selectedCatalog === 'regalos' && 'active'}
            onClick={() => setSelectedCatalog('regalos')}
          >
            Regalos
          </CatalogButton>
        </ButtonsContainer>
        <AnimatePresence exitBeforeEnter>
          {fetchLoader ? (
            <LoaderModified
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              key={1}
            />
          ) : (
            <ProductsGrid
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              key={2}
            >
              {products.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
            </ProductsGrid>
          )}
        </AnimatePresence>
      </ProductsContainer>

      {/* ---------------------------- SERVICE INFO ---------------------- */}
      <ServiceInfoContainer>
        <SubTitle>Servicio</SubTitle>
        <Line />
        <Title>Características</Title>

        <ServiceInfoContent>
          <ServiceInfoItem>
            <ServiceInfoIconContainer>
              <FaBox />
            </ServiceInfoIconContainer>
            <ServiceInfoTitle>Sencillo sistema de ordenes</ServiceInfoTitle>
            <ServiceInfoText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              felis ante, dignissim ut lorem id, iaculis hendrerit felis.
            </ServiceInfoText>
          </ServiceInfoItem>
          <ServiceInfoItem>
            <ServiceInfoIconContainer>
              <FaTruck />
            </ServiceInfoIconContainer>
            <ServiceInfoTitle>Entregas en tiempo</ServiceInfoTitle>
            <ServiceInfoText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              felis ante, dignissim ut lorem id, iaculis hendrerit felis.
            </ServiceInfoText>
          </ServiceInfoItem>
          <ServiceInfoItem>
            <ServiceInfoIconContainer>
              <GiTakeMyMoney />
            </ServiceInfoIconContainer>
            <ServiceInfoTitle>Garantía de devolución del 100%</ServiceInfoTitle>
            <ServiceInfoText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              felis ante, dignissim ut lorem id, iaculis hendrerit felis.
            </ServiceInfoText>
          </ServiceInfoItem>
        </ServiceInfoContent>
      </ServiceInfoContainer>
    </PageGrid>
  );
};

export default Home;
