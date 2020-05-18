## Description

Created a Single Page Application in React displaying a tree of checkboxes. Data used for checkboxes comes from the `src/response.js`, where data is the same as provided by the challenge instructions.

- Added Prettier and ESLint for code format.
- Added responsibe design.
- Added unit tests

## Tools used

ReactJS (create-react-app)
styled-components
prop-types
ESLint
Jest

## Running the project

1. run `yarn`
2. run `yarn start`
3. In case the browser doesn't open automatically, you can go to `http://localhost:3000` to view the page
4. run `yarn test` to start the unit tests

## Remarks

- The main view shows two columns: on the left we have the tree with the structured checkboxes and on the right we have extra actions for the user (show selected items and remove them).
- Using the data provided in `src/response.js`, I've created a `getRootParentId` util that determins the parent root, based on the `parent` value which matches no `id` from inside each object in the `response.js` array. Having the rootParents, I used the `buildTree` to add children for each parent, according to the corresponding `parent` - `id` relationships. The final array is the one used to display the filter tree.
- The `Select all` checkbox is added only under each item from root level, to make it easier for the user to select all items in specific parent or deselect them all.
- `Show categories` button (displayed on the right side in the view) id enabled only when at least one category is selected from the checkbox filter. The button is a toggle that shows/hides all selected categories by the user.
- If a child is checked inside the filter, it will be viewed inside `Show categories` with a tree naming (for example `Dames - Kleding - Badmode - Overige Badmode` is the name for `Overige Badmode` and all labels in front are the higher parents that nest the item).
- Each item shown under `Show categories` has a remove icon, which will deselect the item.
- Under `Show categories` we have `Remove all` button that will remove all selected items, resetting the initial empty filter.
- The view is responsive, with mobile first (I used responsiveness only for displaying the two categories: filter and actions).
