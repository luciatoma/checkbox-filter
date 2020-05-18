import getRootParentId from '../utils/getRootParentId';

const array = [
  {
    id: '001',
    parent: '000',
  },
  {
    id: '002',
    parent: '001',
  },
  {
    id: '003',
    parent: '001',
  },
];

describe('Get the root parent id', () => {
  it('it returns the correct root parent id', () => {
    const parentId = getRootParentId(array);
    expect(parentId).toBe('000');
  });
});
