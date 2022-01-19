import React from 'react';
import PropTypes from 'prop-types';

// Icons
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

// Styles
import { Container, IconContainer, Text, Icons } from './rating.styles';

const Rating = ({ value, text, color }) => {
  return (
    <Container>
      <Icons>
        <IconContainer color={color}>
          {value >= 1 ? (
            <FaStar />
          ) : value >= 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </IconContainer>
        <IconContainer color={color}>
          {value >= 2 ? (
            <FaStar />
          ) : value >= 1.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </IconContainer>
        <IconContainer color={color}>
          {value >= 3 ? (
            <FaStar />
          ) : value >= 2.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </IconContainer>
        <IconContainer color={color}>
          {value >= 4 ? (
            <FaStar />
          ) : value >= 3.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </IconContainer>
        <IconContainer color={color}>
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

Rating.defaultProps = {
  color: '#ffc201',
};

Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Rating;
