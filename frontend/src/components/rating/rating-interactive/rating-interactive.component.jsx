import React from 'react';
import PropTypes from 'prop-types';

// Icons
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

// Styles
import {
  Container,
  IconContainer,
  Text,
  Icons,
} from './rating-interactive.styles';

const RatingInteractive = ({ value, text, handleChange, color }) => {
  return (
    <Container>
      <Icons>
        <IconContainer color={color} onClick={() => handleChange(1)}>
          {value >= 1 ? (
            <FaStar />
          ) : value >= 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </IconContainer>
        <IconContainer color={color} onClick={() => handleChange(2)}>
          {value >= 2 ? (
            <FaStar />
          ) : value >= 1.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </IconContainer>
        <IconContainer color={color} onClick={() => handleChange(3)}>
          {value >= 3 ? (
            <FaStar />
          ) : value >= 2.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </IconContainer>
        <IconContainer color={color} onClick={() => handleChange(4)}>
          {value >= 4 ? (
            <FaStar />
          ) : value >= 3.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </IconContainer>
        <IconContainer color={color} onClick={() => handleChange(5)}>
          {value >= 5 ? (
            <FaStar />
          ) : value >= 4.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </IconContainer>
      </Icons>
      {text && <Text>{text}</Text>}
    </Container>
  );
};

RatingInteractive.defaultProps = {
  color: '#ffc201',
};

RatingInteractive.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default RatingInteractive;
