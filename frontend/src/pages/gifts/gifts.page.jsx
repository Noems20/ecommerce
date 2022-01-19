import React from 'react';

// REDUX

// STYLES
import { PageGrid } from '../../general.styles';
import {
  LeftColumn,
  HeroSubtitleUp,
  HeroTitle,
  HeroSubtitleDown,
} from '../../hero.styles';

import {
  RightColumnResponsive,
  HeroImageResponsive,
  WavesResponsive,
} from '../../category-page.styles';

import { Hero } from './gifts.styles';

// IMAGES
import waves from '../../dev-images/waves2.svg';
import cup from './cup.png';
import Products from '../../components/products/products.component';

const GiftsPage = () => {
  // -------------------- STATE AND CONSTANTS -------------------

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  return (
    <PageGrid
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      {/* ---------------------------- HERO ---------------------- */}
      <Hero>
        <LeftColumn>
          <HeroSubtitleUp
            style={{ color: '#fff' }}
            className='animate__animated animate__fadeInDown'
          >
            ¡Justo para esta navidad!
          </HeroSubtitleUp>
          <HeroTitle
            style={{ color: '#fff' }}
            className='animate__animated animate__fadeIn animate__delay-1s'
          >
            Regalos
          </HeroTitle>
          <HeroSubtitleDown
            style={{ color: '#fff' }}
            className='animate__animated animate__fadeInUp animate__delay-2s'
          >
            El mejor detalle para esa persona especial
          </HeroSubtitleDown>
        </LeftColumn>

        <RightColumnResponsive>
          <WavesResponsive src={waves} />
          <HeroImageResponsive
            src={cup}
            className='animate__animated animate__fadeIn animate__delay-3s'
          />
        </RightColumnResponsive>
      </Hero>
      <Products catalog='regalos' />
    </PageGrid>
  );
};

export default GiftsPage;
