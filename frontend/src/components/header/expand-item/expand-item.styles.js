import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  color: #fff;
  padding: 4rem;
  width: 100%;
  height: 80vh;
  background-color: rgba(51, 51, 51, 0.98);
  z-index: 3;
  overflow: hidden;

  position: absolute;
  top: 8rem;

  display: grid;
  grid-auto-flow: column;
`;

export const Column = styled.div`
  margin: 0 2rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-rows: max-content max-content 1fr;
`;

export const ColumnTitle = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  padding-bottom: 1rem;
  border-bottom: 2px solid #fff;
  display: block;
`;

export const ColumnItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ColumnItem = styled(Link)`
  font-size: 1.6rem;
  color: #fff;
  text-decoration: none;
  position: relative;
  margin-bottom: 1rem;
  padding-bottom: 2px;

  &::after {
    content: '';
    width: 0%;
    height: 2px;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: 0.4s ease-out;
  }
  &:hover::after {
    left: 0;
    width: 100%;
  }
`;

export const ColumnImage = styled.div`
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: center;
`;
