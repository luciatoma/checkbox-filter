import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.label`
  cursor: pointer;
  display: block;
  font-size: 22px;
  margin-bottom: 12px;
  padding-left: 35px;
  position: relative;

  &:hover {
    input ~ span {
      background-color: #ccc;
    }
  }

  input:checked ~ span {
    background-color: white;
    border: 1px solid gray;
  }

  input:checked ~ span {
    &:after {
      display: block;
    }
  }
`;

const Input = styled.input`
  cursor: pointer;
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
`;

const Checkmark = styled.span`
  background-color: #eeeeee;
  height: 25px;
  left: 0;
  position: absolute;
  top: 0;
  width: 25px;

  &:after {
    border: solid #05a2cc;
    border-width: 0 3px 3px 0;
    content: '';
    display: none;
    height: 10px;
    left: 9px;
    position: absolute;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    top: 5px;
    width: 5px;
  }
`;

const Checkbox = ({ check, label, onChange }) => {
  return (
    <Wrapper>
      {label}
      <Input
        type="checkbox"
        checked={check}
        onChange={(e) => onChange(e.target.checked)}
      />
      <Checkmark />
    </Wrapper>
  );
};

Checkbox.propTypes = {
  check: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
