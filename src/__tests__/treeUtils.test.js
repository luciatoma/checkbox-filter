import {
  buildTree,
  selectInTree,
  getSelectedCategories,
  getFullArrayOfParents,
} from '../utils/treeUtils';

const array = [
  {
    id: '001',
    parent: '000',
    name: 'One',
  },
  {
    id: '002',
    parent: '001',
    name: 'Two',
  },
  {
    id: '003',
    parent: '001',
    name: 'Three',
  },
  {
    id: '004',
    parent: '000',
    name: 'Four',
  },
];

describe('Get the built tree', () => {
  it('it returns the correct root parent array containing a new array with its children', () => {
    const rootParentArray = buildTree(array);
    expect(rootParentArray).toEqual([
      {
        children: [
          {
            id: '002',
            isRootLevel: false,
            name: 'Two',
            parent: '001',
            selected: false,
          },
          {
            id: '003',
            isRootLevel: false,
            name: 'Three',
            parent: '001',
            selected: false,
          },
        ],
        id: '001',
        isRootLevel: true,
        name: 'One',
        parent: '000',
        selected: false,
      },
      {
        id: '004',
        isRootLevel: true,
        name: 'Four',
        parent: '000',
        selected: false,
      },
    ]);
  });
});

describe('Select in built tree', () => {
  it('it adds value true to selected key in parent if action is true', () => {
    const rootParentArray = buildTree(array);
    const selectItem = selectInTree(rootParentArray, '004', false, true);
    expect(selectItem[1].selected).toBe(true);
  });

  it('id adds value true to selected key in children if selectAll is true in parent', () => {
    const rootParentArray = buildTree(array);
    const selectItem = selectInTree(rootParentArray, '001', true, true);
    expect(selectItem[0].children[0].selected).toBe(true);
    expect(selectItem[0].children[1].selected).toBe(true);
  });
});

describe('Get selected categories', () => {
  it('returns empty array when no item is selected in rootParentArray', () => {
    const rootParentArray = buildTree(array);
    const selectedCategories = getSelectedCategories(rootParentArray);
    expect(selectedCategories).toStrictEqual([]);
  });

  it('returns array with selected item from tree', () => {
    const rootParentArray = buildTree(array);
    const selectItem = selectInTree(rootParentArray, '004', false, true);
    const selectedCategories = getSelectedCategories(selectItem);
    expect(selectedCategories[0].id).toBe('004');
  });
});

describe('Get array with all parents until an item', () => {
  it('returns an array with selected item and its parent', () => {
    const rootParentArray = buildTree(array);
    const selectItem = selectInTree(rootParentArray, '002', false, true);
    const nameOfChild = getFullArrayOfParents(selectItem, '002');
    expect(nameOfChild).toHaveLength(2);
  });
});
