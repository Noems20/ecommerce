import styled from 'styled-components';
import { motion } from 'framer-motion';
import background from '../../background.jpg';

// const marginRightLeft = '4rem';
// const marginTopBottom = '3rem';

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

export const UserDetails = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  align-items: center;
  grid-gap: 5rem;

  @media only screen and (max-width: 600px) {
    padding: 3rem 0;
    justify-items: center;
    grid-gap: 1rem;
    grid-template-columns: 1fr;
    grid-template-rows: min-content min-content;
  }
`;

export const UserImageContainer = styled.div`
  position: relative;
`;

export const UserImage = styled.div`
  height: 24rem;
  width: 24rem;

  border-radius: 50%;
  border: 5px solid var(--color-primary-light);
  background-image: ${(props) => `url(${props.url})`};
  background-size: cover;
  background-position: center;
  box-shadow: 0px 0px 8px 1px var(--color-grey-dark-1);
  -webkit-box-shadow: 0px 0px 8px 1px var(--color-grey-dark-1);
  -moz-box-shadow: 0px 0px 8px 1px var(--color-grey-dark-1);

  @media only screen and (max-width: 600px) {
    height: 20rem;
    width: 20rem;
  }
`;

export const ImageInput = styled.input`
  display: none;
`;

export const ImageInputLabel = styled.label`
  position: absolute;
  top: 70%;
  right: 2%;
  color: ${({ error }) =>
    error ? 'var(--color-red)' : 'var(--color-primary)'};
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    font-size: 2.5rem;
  }
`;

export const UserInfo = styled.div``;

export const UserName = styled.div`
  font-weight: 300;
  font-size: 3rem;
  color: #fff;

  @media only screen and (max-width: 600px) {
    text-align: center;
  }
`;

export const Info = styled.div`
  font-size: 2rem;
  font-weight: 200;
  color: #fff;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  display: flex;
  align-items: center;

  & svg {
    margin-right: 2rem;
  }

  @media only screen and (max-width: 600px) {
    justify-content: center;
    & svg {
      margin-right: 1rem;
    }
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
