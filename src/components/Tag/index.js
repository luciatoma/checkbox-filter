import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import iconDelete from './delete-icon.svg';

const Wrapper = styled.div`
  border: 1px solid #05a2cc;
  border-radius: 20px;
  color: #05a2cc;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 12px;
`;

const Image = styled.img`
  cursor: pointer;
  margin-left: 12px;
  width: 14px;
`;

const Tag = ({ title, onClick }) => {
  return (
    <Wrapper>
      {title}
      <Image src={iconDelete} alt="Remove item" onClick={onClick} />
    </Wrapper>
  );
};

Tag.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tag;
