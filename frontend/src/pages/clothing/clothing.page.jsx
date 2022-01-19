import React from 'react';
import { useParams } from 'react-router';

// REDUX

// STYLES
import { PageGrid } from '../../general.styles';
import { LeftColumn, HeroTitle, HeroSubtitleDown } from '../../hero.styles';

import {
  RightColumnResponsive,
  WavesResponsive,
} from '../../category-page.styles';

import {
  Hero,
  HeroImageResponsiveModified,
  HeroSubtitleUpModified,
} from './clothing.styles';

// IMAGES
import waves from '../../dev-images/waves2.svg';
import man from '../../dev-images/man.png';
import boy from '../../dev-images/boy.png';
import woman from '../../dev-images/woman.png';
import girl from '../../dev-images/girl.png';
import sweatshirtWoman from '../../dev-images/sweatshirtWoman.png';
import sweatshirtGirl from '../../dev-images/sweatshirtGirl.png';
import sweatshirtMan from '../../dev-images/sweatshirtMan.png';
import sweatshirtBoy from '../../dev-images/sweatshirtBoy.png';
import Products from '../../components/products/products.component';

const ClothingPage = () => {
  // -------------------- STATE AND CONSTANTS -------------------
  const { category, for: forW } = useParams();

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  function imageSwitch() {
    if (category === 'playera') {
      if (forW === 'hombre') return man;
      else if (forW === 'mujer') return woman;
      else if (forW === 'niño') return boy;
      else if (forW === 'niña') return girl;
      else if (forW === 'general') return man;
    } else if (category === 'sudadera') {
      if (forW === 'hombre') return sweatshirtMan;
      else if (forW === 'mujer') return sweatshirtWoman;
      else if (forW === 'niño') return sweatshirtBoy;
      else if (forW === 'niña') return sweatshirtGirl;
      else if (forW === 'general') return sweatshirtGirl;
    } else {
      if (forW === 'hombre') return man;
      else if (forW === 'mujer') return sweatshirtWoman;
      else if (forW === 'niño') return boy;
      else if (forW === 'niña') return girl;
      else if (forW === 'general') return boy;
    }
  }

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
          <HeroSubtitleUpModified
            style={{ color: '#fff', textTransform: 'capitalize' }}
            className='animate__animated animate__fadeInDown'
          >
            {`${category}s`}
          </HeroSubtitleUpModified>
          <HeroTitle
            style={{ color: '#fff', textTransform: 'capitalize' }}
            className='animate__animated animate__fadeIn animate__delay-1s'
          >
            {forW}
          </HeroTitle>
          <HeroSubtitleDown
            style={{ color: '#fff' }}
            className='animate__animated animate__fadeInUp animate__delay-2s'
          >
            La mejor calidad de Zacatecas
          </HeroSubtitleDown>
        </LeftColumn>

        <RightColumnResponsive>
          <WavesResponsive src={waves} />
          <HeroImageResponsiveModified
            src={imageSwitch()}
            className='animate__animated animate__fadeIn animate__delay-3s'
          />
        </RightColumnResponsive>
      </Hero>
      <Products forW={forW} category={category} catalog='ropa' />
    </PageGrid>
  );
};

export default ClothingPage;
