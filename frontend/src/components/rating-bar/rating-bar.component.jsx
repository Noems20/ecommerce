import React, { useState } from 'react';

// STYLES
import {
  RatingNumber,
  RatingPercentage,
  Percentage,
} from './rating-bar.styles';

const RatingBar = ({ rating, percentage, onClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <>
      <RatingNumber
        className={hover && 'onHover'}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {rating}
      </RatingNumber>
      <RatingPercentage
        className={hover && 'onHover'}
        percentage={percentage}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
      <Percentage
        className={hover && 'onHover'}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {percentage}
      </Percentage>
    </>
  );
};

export default RatingBar;
