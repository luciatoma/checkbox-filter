import getRootParentId from './getRootParentId';

const cloneDeep = (obj) => JSON.parse(JSON.stringify(obj));

/**
 * Create a tree of parent arrays containing children
 *
 * @param {Array} arr
 * @param {Object} parent
 * @param {*} tree
 */
const buildTree = (array, parent) => {
  const rootLevelId = getRootParentId(array);
  let tree = [];
  parent = typeof parent !== 'undefined' ? parent : { id: rootLevelId };

  const children = array
    .filter((child) => {
      return child.parent === parent.id;
    })
    .map((el) => ({
      ...el,
      selected: false,
      isRootLevel: el.parent === rootLevelId,
    }));

  if (children.length !== 0) {
    if (parent.id === rootLevelId) {
      tree = children;
    } else {
      parent.children = children;
    }
    children.forEach((child) => {
      buildTree(array, child);
    });
  }

  return tree;
};

/**
 * Select one or all items from tree array, based on selectAll and action values
 *
 * @param {Array} tree
 * @param {String} id
 * @param {Boolean} selectAll
 * @param {Boolean} action
 */
const selectInTree = (tree, id, selectAll, action) => {
  const treeClone = cloneDeep(tree);

  const traverseTree = (givenTree, selectAllChildren) => {
    givenTree.forEach((el) => {
      // if this is the clicked element
      if (el.id === id) {
        if (!selectAll) el.selected = action;
        if (el.children)
          return traverseTree(el.children, action === false ? true : selectAll);
        return false;
      }

      // we had a parent which was marked as selectAll
      if (selectAllChildren) el.selected = action;

      // continue
      if (el.children) return traverseTree(el.children, selectAllChildren);
      return false;
    });
  };

  traverseTree(treeClone);
  return treeClone;
};

/**
 * Create an array with all selected items from tree
 *
 * @param {Array} tree
 */
const getSelectedCategories = (tree) => {
  const selected = [];

  const traverseTree = (givenTree) => {
    givenTree.forEach((el) => {
      if (el.selected) {
        selected.push({ id: el.id, name: el.name });
      }

      if (el.children) return traverseTree(el.children);
      return false;
    });
  };

  traverseTree(tree);
  return selected;
};

/**
 * Create array containing all parents of selected item, in order to create the item name based on its higher levels
 *
 * @param {Array} tree
 * @param {String} id
 */
const getFullArrayOfParents = (tree, id) => {
  const parents = [];
  const rootLevelId = getRootParentId(tree);
  const traverseTree = (givenTree, givenId) => {
    givenTree.forEach((el) => {
      if (el.id === givenId) {
        parents.push(el);
        if (el.parent !== rootLevelId) {
          return traverseTree(tree, el.parent);
        }
      }

      // continue
      if (el.children) return traverseTree(el.children, givenId);
      return false;
    });
  };

  traverseTree(tree, id);
  return parents.reverse();
};

export {
  buildTree,
  selectInTree,
  getSelectedCategories,
  getFullArrayOfParents,
};
