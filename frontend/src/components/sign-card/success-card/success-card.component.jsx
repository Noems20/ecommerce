import React from 'react';

// REDUX

// COMPONENTS

// STYLES
import {
  SignCard,
  Form,
  Logo,
  SignIcon,
  SignTitle,
  SignText,
} from '../../../general.styles';

// LOGOS
import logo4 from '../../form-container/logo4.svg';

// ICONS
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

const SuccessCard = ({ variants, title, text }) => {
  return (
    <SignCard
      variants={variants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <Form>
        <Logo src={logo4} />
        <SignTitle>{title}</SignTitle>
        <SignText>{text}</SignText>
        <SignIcon>
          <IoMdCheckmarkCircleOutline />
        </SignIcon>
      </Form>
    </SignCard>
  );
};

export default SuccessCard;
