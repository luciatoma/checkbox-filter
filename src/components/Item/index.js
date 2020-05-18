import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Checkbox from '../Checkbox';

const ChildrenContent = styled.div`
  margin-left: 20px;
`;

const Item = ({ element, dispatch }) => {
  // For every item that contains children, create a visual tree to show the children items
  const childrenItems = () => {
    if (element.children) {
      return (
        <ChildrenContent>
          {element.children.length > 1 && element.isRootLevel && (
            <Checkbox
              label="Select all"
              onChange={(e) => {
                dispatch({
                  type: e ? 'select' : 'deselect',
                  id: element.id,
                  selectAll: true,
                });
              }}
              check={element.children.every((el) => el.selected)}
            />
          )}
          {element.children.map((item) => (
            <Item key={item.id} element={item} dispatch={dispatch} />
          ))}
        </ChildrenContent>
      );
    }
    return null;
  };

  return (
    <>
      <Checkbox
        label={element.name}
        onChange={(e) => {
          dispatch({ type: e ? 'select' : 'deselect', id: element.id });
        }}
        check={element.selected}
      />
      {element.selected && childrenItems()}
    </>
  );
};

Item.propTypes = {
  dispatch: PropTypes.func.isRequired,
  element: PropTypes.shape({
    children: PropTypes.array,
    id: PropTypes.string,
    isRootLevel: PropTypes.bool,
    name: PropTypes.string,
    selected: PropTypes.bool.isRequired,
  }),
};

export default Item;
