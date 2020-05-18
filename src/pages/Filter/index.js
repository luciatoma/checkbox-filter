import React, { useReducer } from 'react';
import styled from 'styled-components';
import data from '../../response';
import Item from '../../components/Item';
import Button from '../../components/Button';
import Tag from '../../components/Tag';
import {
  buildTree,
  selectInTree,
  getSelectedCategories,
  getFullArrayOfParents,
} from '../../utils/treeUtils';

const Wrapper = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(1, 1fr);
  padding: 30px;

  @media (min-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Actions = styled.div`
  display: grid;
  grid-gap: 20px;
`;

const TagsContent = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    margin-top: 20px;
    margin-right: 20px;
  }
`;

const mainArray = data.data.categories;

const initialState = {
  tree: buildTree(mainArray),
  selectedCategories: [],
  showCategories: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'select':
      const tree = selectInTree(state.tree, action.id, action.selectAll, true);
      return {
        ...state,
        tree,
        selectedCategories: getSelectedCategories(tree),
      };
    case 'deselect':
      const newTree = selectInTree(
        state.tree,
        action.id,
        action.selectAll,
        false
      );
      return {
        ...state,
        tree: newTree,
        selectedCategories: getSelectedCategories(newTree),
      };
    case 'toggle_categories':
      return { ...state, showCategories: !state.showCategories };
    case 'remove_all':
      return {
        ...state,
        tree: buildTree(mainArray),
        selectedCategories: [],
      };
    default:
      return state;
  }
};

const Filter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tree, selectedCategories, showCategories } = state;

  return (
    <Wrapper>
      <div>
        {tree.map((el) => (
          <Item element={el} key={el.id} dispatch={dispatch} />
        ))}
      </div>
      <div>
        <Button
          title={showCategories ? 'Hide categories' : 'Show categories'}
          disabled={selectedCategories.length === 0}
          onClick={() => {
            dispatch({ type: 'toggle_categories' });
          }}
        />
        {showCategories && selectedCategories.length > 0 && (
          <Actions>
            <TagsContent>
              {selectedCategories.map((el) => {
                const tagTitle = getFullArrayOfParents(tree, el.id)
                  .map((e) => e.name)
                  .join(' - ');
                return (
                  <Tag
                    key={el.id}
                    title={tagTitle}
                    onClick={() => dispatch({ type: 'deselect', id: el.id })}
                  />
                );
              })}
            </TagsContent>
            <Button
              title="Remove all"
              onClick={() => dispatch({ type: 'remove_all' })}
              color="green"
            />
          </Actions>
        )}
      </div>
    </Wrapper>
  );
};

export default Filter;
