import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  background-color: var(--color-grey-dark-1);
  border-radius: var(--border-radius);
  border: #f5f5f5;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px;

  padding: 1rem;
  overflow: hidden;

  position: absolute;
  top: 5.65rem; /* position the top  edge of the element at the middle of the parent */
  left: 90%; /* position the left edge of the element at the middle of the parent */

  box-shadow: 5px 5px 5px rgb(0 0 0 / 50%);
  z-index: 2;

  transform: translate(
    -90%,
    0
  ); /* This is a shorthand of translateX(-50%) and translateY(-50%) */
`;

export const Arrow = styled.div`
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 0 2rem 2rem 2rem; // Right and left center the arrow form and bottom creates the arrow
  border-color: transparent transparent var(--color-grey-dark-1) transparent; // Arrow up -> border bottom show
  /* -webkit-filter: drop-shadow(0px -2px 1px rgba(255, 255, 255, 0.75)); */
  /* filter: drop-shadow(0px -3px 3px rgba(0, 0, 0, 0.04)); */
  transition: border-width 0.6s linear;

  position: absolute;
  top: 3.75rem;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  z-index: 2;
`;

export const Items = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
`;

// --------------------------- CHILD COMPONENTS ----------------

export const DropDownItemContainer = styled.div`
  font-size: 1.7rem;
  font-weight: 400;
  padding: 1rem 2rem;
  &:not(:last-child) {
    margin-bottom: 3px;
  }
  border-radius: var(--border-radius);
  text-decoration: none;
  cursor: pointer;

  display: grid;
  grid-template-columns: max-content max-content;
  align-items: center;
  align-content: center;
  grid-gap: 1rem;
  transition: background-color 0.2s ease;

  & * {
    text-transform: none;
    text-decoration: none;
    color: #fff;
    cursor: pointer;
  }

  & svg {
    height: 2.5rem;
    width: 2.5rem;
    padding: 2px;
  }

  &.is-active {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transition: background-color 0.2s ease;
  }
`;

export const IconContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  height: 3.5rem;
  width: 3.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    color: #fff !important;
  }
`;
