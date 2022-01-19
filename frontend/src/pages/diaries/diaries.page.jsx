import React from 'react';

// REDUX

// STYLES
import { PageGrid } from '../../general.styles';
import {
  LeftColumn,
  RightColumn,
  HeroSubtitleUp,
  HeroTitle,
  HeroSubtitleDown,
  Waves,
} from '../../hero.styles';

import { Hero, HeroImageModified } from './diaries.styles';

// IMAGES
import waves from '../../dev-images/waves2.svg';
import Products from '../../components/products/products.component';
import agenda from '../../dev-images/agenda.png';

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
          <HeroSubtitleUp className='animate__animated animate__fadeInDown'>
            La mejor relación calidad-precio
          </HeroSubtitleUp>
          <HeroTitle className='animate__animated animate__fadeIn animate__delay-1s'>
            Agendas
          </HeroTitle>
          <HeroSubtitleDown className='animate__animated animate__fadeInUp animate__delay-2s'>
            Proximamente Agendas Personalizadas
          </HeroSubtitleDown>
        </LeftColumn>

        <RightColumn>
          <Waves src={waves} />
          <HeroImageModified
            src={agenda}
            className='animate__animated animate__fadeIn animate__delay-3s'
          />
        </RightColumn>
      </Hero>
      <Products catalog='agendas' />
    </PageGrid>
  );
};

export default GiftsPage;
