import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Loader from './components/loaders/loader.component';
import Message from './components/messages/normal-message/normal-message.component';

// ---------------------------------------------------------
// PAGE GRID
// ---------------------------------------------------------
export const PageGrid = styled(motion.div)`
  display: grid;
  grid-template-columns:
    [full-start] minmax(6rem, 1fr) [center-start] repeat(
      8,
      [col-start] minmax(min-content, 14rem) [col-end]
    )
    [center-end] minmax(6rem, 1fr) [full-end];
`;

// ---------------------------------------------------------
// SIGN CARD
// ---------------------------------------------------------

export const SignCard = styled(motion.div)`
  width: 40%;
  background-color: #fff;
  margin: 4rem 0;
  padding: 2rem 5rem;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  -webkit-box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  -moz-box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  display: flex;
  justify-content: center;

  z-index: 1;

  @media only screen and (max-width: 1350px) {
    width: 60%;
  }

  @media only screen and (max-width: 750px) {
    width: 80%;
  }

  @media only screen and (max-width: 550px) {
    width: 100%;
    padding: 2rem 3rem;
    margin: 6rem 0;
  }
`;

// ---------------------------------------------------------
// FORM SIGN
// ---------------------------------------------------------
export const Form = styled.form`
  width: 100%;

  display: grid;
  grid-gap: 2rem;
`;

// ---------------------------------------------------------
// BACK BUTTON
// ---------------------------------------------------------

export const BackButton = styled.div`
  justify-self: center;
  cursor: pointer;

  & svg {
    font-size: 3rem;
    color: var(--color-primary);
    transition: color 0.2s ease;

    &:hover {
      color: #000;
      transition: color 0.2s ease;
    }
  }
`;

// ---------------------------------------------------------
// LOGO SIGN CARD
// ---------------------------------------------------------

export const Logo = styled.img`
  width: 15%;
  justify-self: center;

  @media only screen and (max-width: 500px) {
    width: 20%;
  }
`;

// ---------------------------------------------------------
// ICON SIGN CARD
// ---------------------------------------------------------

export const SignIcon = styled.div`
  display: flex;
  justify-content: center;
  & svg {
    color: var(--color-primary);
    font-size: 9rem;
  }
`;

// ---------------------------------------------------------
// TITLE SIGN CARD
// ---------------------------------------------------------

export const SignTitle = styled.h1`
  font-family: inherit;
  font-weight: 500;
  font-size: 2.5rem;
  text-align: center;
  text-transform: uppercase;
`;

// ---------------------------------------------------------
// TEXT SIGN CARD
// ---------------------------------------------------------

export const SignText = styled.p`
  font-size: 1.6rem;
  text-align: center;
  margin-top: -1.5rem;
`;

// ---------------------------------------------------------
// BOTTOM SIGN CARD
// ---------------------------------------------------------

export const BottomLinksContainer = styled.div``;

export const BottomText = styled.p`
  font-size: 1.5rem;
`;

export const LinkText = styled(Link)`
  text-decoration: none;
  color: var(--color-primary);
  cursor: pointer;
`;

// ---------------------------------------------------------
// LOADER
// ---------------------------------------------------------
export const LoaderModified = styled(Loader)`
  --clr1: var(--color-primary);
  --clr2: var(--color-primary);
  --clr3: var(--color-primary);
  --clr4: var(--color-primary);
  --clr5: var(--color-primary);

  --size: 100px;

  margin: 15rem auto;
`;

// ---------------------------------------------------------------
// MESSAGE MODIFIED
// ---------------------------------------------------------------
export const Alert = styled(Message)`
  max-width: 55rem;
`;
