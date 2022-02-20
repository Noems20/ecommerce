import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const FooterContainer = styled.footer`
  background-color: #000;
  color: #fff;
  margin-top: 15rem;
  padding: 4rem 4rem;
  padding-top: 15rem;
  padding-bottom: 2rem;
  position: relative;

  display: grid;
  grid-template-rows: max-content min-content;
  grid-gap: 4rem;

  @media only screen and (max-width: 380px) {
    padding-top: 20rem;
    margin-top: 20rem;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(23rem, 1fr));
`;

export const Item = styled.div`
  transition: height 0.2s ease;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content;
  grid-gap: 1rem;

  @media only screen and (max-width: 447px) {
    &.social {
      justify-items: center;
      grid-row: 5 / 6;
    }
  }
`;

export const ItemTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;

  & svg {
    display: none;
  }

  @media only screen and (max-width: 447px) {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & svg {
      display: inline-block;
      font-size: 2rem;
    }
  }
`;

export const IconsContainer = styled.div`
  height: max-content;
  margin-top: 1.5rem;

  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-auto-rows: max-content;
  grid-gap: 2rem;

  @media only screen and (max-width: 447px) {
    margin: 0;
    grid-gap: 3rem;
  }
`;

export const IconContainer = styled(Link)`
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 100px;
  height: 4rem;
  width: 4rem;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  & svg {
    font-size: 1.8rem;
    color: #fff !important;
  }
`;

export const List = styled(motion.ul)`
  list-style: none;
  overflow: hidden;
`;
export const ListItem = styled.li`
  line-height: 1.6;
  font-weight: 400;
  font-size: 1.6rem;
  width: 100%;
  margin: 1.5rem 0;
`;
export const ListItemLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;

  width: 100%;
`;

export const StartContainer = styled.div`
  justify-self: center;
  position: absolute;
  width: 80%;
  /* height: 10rem; */
  padding: 3rem;
  transform: translateY(-50%);
  border-radius: 10px;

  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(var(--color-primary-dark)),
    to(#00a5ff)
  );
  background-image: linear-gradient(90deg, var(--color-primary-dark), #00a5ff);

  box-shadow: 0px 1px 10px 2px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 1px 10px 2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 1px 10px 2px rgba(0, 0, 0, 0.75);

  display: flex;
  align-items: center;

  @media only screen and (max-width: 1150px) {
    flex-direction: column;
    justify-content: center;
  }

  @media only screen and (max-width: 500px) {
    width: 100%;
    border-radius: 0;
    text-align: center;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 100;
  margin-bottom: 1rem;

  @media only screen and (max-width: 1150px) {
    margin-bottom: 2rem;
  }
`;

export const ChecksContainer = styled.div`
  display: flex;

  @media only screen and (max-width: 1150px) {
    justify-content: center;
    margin-bottom: 2rem;
  }
`;

export const Check = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-right: 2rem;
  }

  & svg {
    font-size: 2rem;
    margin-right: 0.5rem;
  }

  @media only screen and (max-width: 1150px) {
    margin: 0;
  }
`;

export const ButtonContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 1150px) {
    margin: 0;
  }

  @media only screen and (max-width: 370px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Button = styled(Link)`
  font-size: 1.6rem;
  color: #fff;
  text-decoration: none;
  padding: 1rem 1.5rem;
  border: 1px solid #fff;
  border-radius: 100px;

  display: flex;
  align-items: center;

  &.register {
    background-color: #000;
    border: 1px solid #000;
  }

  &:not(:last-child) {
    margin-right: 2rem;
  }

  & p {
    margin-right: 10px;
  }

  & svg {
    font-size: 2.5rem;
    transition: transform 0.2s ease;
  }

  &:hover {
    & svg {
      transform: translateX(3px);
      transition: transform 0.2s ease;
    }
  }

  @media only screen and (max-width: 370px) {
    &:not(:last-child) {
      margin-right: 0;
      margin-bottom: 2rem;
    }
  }
`;

export const WebsiteRights = styled.p`
  font-size: 1.2rem;

  @media only screen and (max-width: 447px) {
    text-align: center;
  }
`;
