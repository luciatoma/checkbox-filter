import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${({ color }) => (color ? `${color}` : '#11a9e6')};
  border-radius: 4px;
  border: 1px solid ${({ color }) => (color ? `${color}` : '#11a9e6')};
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 16px;

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: no-drop;
  }
`;

const Button = ({ color, disabled, onClick, title }) => {
  return (
    <StyledButton
      color={color}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {title}
    </StyledButton>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Button;
