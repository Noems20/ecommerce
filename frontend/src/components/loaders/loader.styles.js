import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Spinner = styled(motion.div)`
  --size: 75px;
  --clr-bg: #272324;
  --clr1: #fff;
  --clr2: #fff;
  --clr3: #fff;
  --clr4: #fff;
  --clr5: #fff;
  --animation-duration: 1000ms;
  width: var(--size);
  height: var(--size);
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  grid-gap: 4px;

  & div:nth-child(1) {
    --clr-spinner: var(--clr1);
  }

  & div:nth-child(2) {
    --clr-spinner: var(--clr3);
    animation-delay: calc(var(--animation-duration) / 10);
  }

  & div:nth-child(3) {
    --clr-spinner: var(--clr5);
    animation-delay: calc(var(--animation-duration) / 10 * 2);
  }

  & div:nth-child(4) {
    --clr-spinner: var(--clr4);
    animation-delay: calc(var(--animation-duration) / 10 * 3);
  }

  & div:nth-child(5) {
    --clr-spinner: var(--clr2);
    animation-delay: calc(var(--animation-duration) / 10 * 4);
  }
`;

export const SpinnerItem = styled.div`
  height: 40%;
  background-color: var(--clr-spinner);
  width: calc(var(--size) / 13);
  animation: spinner5 var(--animation-duration) ease-in-out infinite;

  @keyframes spinner5 {
    25% {
      transform: scaleY(2);
    }

    50% {
      transform: scaleY(1);
    }
  }
`;
