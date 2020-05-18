/**
 * Get root parent from array
 *
 * @param {*} arr
 */
const getRootParentId = (arr) => {
  let id = null;
  arr.forEach((elem) => {
    const rootParent = arr.filter((item) => item.id === elem.parent);
    if (rootParent.length === 0) id = elem.parent;
  });
  return id;
};

export default getRootParentId;
