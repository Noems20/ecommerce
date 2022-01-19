import styled from 'styled-components';
import { motion } from 'framer-motion';
import background from '../../background.jpg';
import tokens from '../../tokens';

// -----------------------------------------------------------
// HEADER
// -----------------------------------------------------------

export const UserDetailsContainer = styled.div`
  grid-column: full-start / full-end;
  height: 30rem;
  background-image: linear-gradient(
      90deg,
      rgba(0, 83, 162, 0.9) 0%,
      rgba(0, 83, 162, 0.9) 50%,
      rgba(0, 83, 162, 0.9) 100%
    ),
    url(${background});
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    height: auto;
  }
`;

export const Title = styled.h1`
  font-family: ${tokens.fontDisplay};
  font-size: 8rem;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  padding: 4rem;

  @media only screen and (max-width: 350px) {
    padding: 4rem 2rem;
    font-size: 6rem;
  }
`;

// -----------------------------------------------------------
// SETTINGS BAR
// -----------------------------------------------------------

export const Settings = styled.div`
  grid-column: full-start / full-end;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px;
`;

export const SettingsBar = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  overflow: hidden;

  @media only screen and (max-width: 500px) {
    flex-direction: column;
    items-content: flex-start;
    margin: 0rem 4rem;
    margin-bottom: 1rem;
  }
`;

export const CollapseItem = styled.h1`
  padding: 2rem 4rem;
  font-weight: 300;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (min-width: 500px) {
    display: none;
  }
`;

export const SettingItem = styled.h1`
  padding: 1.5rem 0;
  font-weight: 300;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease-out;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;

  &.active,
  &:hover {
    color: var(--color-primary);
    transition: color 0.2s ease-out;
  }

  &::after {
    content: '';
    width: 0%;
    height: 2px;
    background-color: var(--color-primary);
    position: absolute;
    bottom: 0;
    left: 50%;
    transition: 0.4s ease-out;

    @media only screen and (max-width: 500px) {
      left: 0;
    }
  }

  &.active::after,
  &:hover::after {
    left: 0;
    width: 100%;
  }

  @media only screen and (max-width: 500px) {
    padding: 0;
    margin-bottom: 1rem;
    &:not(:first-child) {
      margin: 1rem 0;
    }
  }
`;

// -----------------------------------------------------------
// TAB CONTENT
// -----------------------------------------------------------
// export const TabContent = styled.div`
//   grid-column: full-start / full-end;
//   margin: 3rem 4rem;
// `;
