import React from 'react';
import { RiCloseCircleFill, RiCheckboxCircleFill } from 'react-icons/ri';
import { IoWarning } from 'react-icons/io5';

// STYLES
import {
  Container,
  Icon,
  AlertContent,
  AlertTitle,
  AlertText,
  Button,
  Decoration,
  CloseIcon,
} from './normal-message.styles';

const Message = ({
  title,
  text,
  button,
  type,
  handleClose,
  handleAction,
  className,
  ...props
}) => {
  const renderIcon = (type) => {
    switch (type) {
      case 'error':
        return <RiCloseCircleFill />;
      case 'success':
        return <RiCheckboxCircleFill />;
      case 'warning':
        return <IoWarning />;
      default:
        return <RiCloseCircleFill />;
    }
  };

  return (
    <Container type={type} className={className} {...props}>
      <Icon>{renderIcon(type)} </Icon>
      <AlertContent>
        <AlertTitle>{title}</AlertTitle>
        <AlertText>{text}</AlertText>
        {button && (
          <Button type={type} onClick={handleAction}>
            {button}
          </Button>
        )}
      </AlertContent>
      {button && <CloseIcon onClick={handleClose} />}
      <Decoration />
    </Container>
  );
};

export default Message;
