import React, { useState } from 'react';

// COMPONENTS
import ProductCard from '../../components/product-card/product-card.component';
import Rating from '../../components/rating/rating.component';

// STYLES
import { PageGrid } from '../../general.styles';
import {
  LeftColumn,
  HeroSubtitleUp,
  HeroSubtitleDown,
} from '../../hero.styles';

import {
  RightColumnResponsive,
  HeroImageResponsive,
  WavesResponsive,
  Products,
  FilterTitle,
  FiltersContainer,
  Filter,
  FilterItem,
  RadioButton,
  ProductsGrid,
} from '../../category-page.styles';

import { Hero, HeroTitleModified } from './bound-books.styles';

// IMAGES
import agenda1 from '../../dev-images/agenda1.png';
import agenda2 from '../../dev-images/agenda2.png';
import agenda3 from '../../dev-images/agenda3.png';
import agenda4 from '../../dev-images/agenda4.png';
import agenda5 from '../../dev-images/agenda5.png';
import agenda6 from '../../dev-images/agenda6.png';
import agenda7 from '../../dev-images/agenda7.png';
import agenda8 from '../../dev-images/agenda8.png';
import agenda9 from '../../dev-images/agenda9.png';
import waves from '../../dev-images/waves2.svg';
import boundBook from './bound-book.png';

const BoundBooksPage = () => {
  const [orderBy, setOrderBy] = useState('rating');

  return (
    <PageGrid>
      {/* ---------------------------- HERO ---------------------- */}
      <Hero>
        <LeftColumn>
          <HeroSubtitleUp
            style={{ color: '#fff' }}
            className='animate__animated animate__fadeInDown'
          >
            La mejor relación calidad-precio
          </HeroSubtitleUp>
          <HeroTitleModified
            style={{ color: '#fff' }}
            className='animate__animated animate__fadeIn animate__delay-1s'
          >
            Empastados
          </HeroTitleModified>
          <HeroSubtitleDown
            style={{ color: '#fff' }}
            className='animate__animated animate__fadeInUp animate__delay-2s'
          >
            Proximamente Agendas Personalizadas
          </HeroSubtitleDown>
        </LeftColumn>

        <RightColumnResponsive>
          <WavesResponsive src={waves} />
          <HeroImageResponsive
            src={boundBook}
            className='animate__animated animate__fadeIn animate__delay-3s'
          />
        </RightColumnResponsive>
      </Hero>
      <Products>
        <FiltersContainer>
          <Filter>
            <FilterTitle>Opinión media de los clientes</FilterTitle>
            <FilterItem>
              <Rating value={4} /> o más
            </FilterItem>
            <FilterItem>
              <Rating value={3} /> o más
            </FilterItem>
            <FilterItem>
              <Rating value={2} /> o más
            </FilterItem>
            <FilterItem>
              <Rating value={1} /> o más
            </FilterItem>
          </Filter>
          <Filter>
            <FilterTitle>Precio</FilterTitle>
            <FilterItem>Hasta $300</FilterItem>
            <FilterItem>$300 a $400</FilterItem>
            <FilterItem>$500 y más</FilterItem>
          </Filter>
          <Filter>
            <FilterTitle>Ordenar por</FilterTitle>
            <FilterItem onClick={() => setOrderBy('priceAscending')}>
              <RadioButton
                className={orderBy === 'priceAscending' && 'selected'}
              />
              Precio: de más bajo a más alto
            </FilterItem>
            <FilterItem onClick={() => setOrderBy('priceDescending')}>
              <RadioButton
                className={orderBy === 'priceDescending' && 'selected'}
              />
              Precio: de más alto a más bajo
            </FilterItem>
            <FilterItem onClick={() => setOrderBy('rating')}>
              <RadioButton className={orderBy === 'rating' && 'selected'} />
              Opinión media de los clientes
            </FilterItem>
          </Filter>
        </FiltersContainer>
        <ProductsGrid>
          <ProductCard productImage={agenda1} title='Agenda 2022' tag='AGEN' />
          <ProductCard
            productImage={agenda2}
            title='Encuadernado azul'
            tag='AGEN'
          />
          <ProductCard productImage={agenda3} title='Agenda MTIE' tag='AGEN' />
          <ProductCard productImage={agenda4} title='Agenda UAD' tag='AGEN' />
          <ProductCard productImage={agenda5} title='Agenda IEZ' tag='AGEN' />
          <ProductCard
            productImage={agenda6}
            title='Encuadernado keratol'
            tag='AGEN'
          />
          <ProductCard productImage={agenda7} title='Agenda UTZAC' tag='AGEN' />
          <ProductCard
            productImage={agenda8}
            title='Encuadernado keratol'
            tag='AGEN'
          />
          <ProductCard productImage={agenda9} title='Agenda 2022' tag='AGEN' />
        </ProductsGrid>
      </Products>
    </PageGrid>
  );
};

export default BoundBooksPage;
