import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Filter from '../pages/Filter';

/* global document */

it('renders without crashing and matches snapshot', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Filter />, div);
  ReactDOM.unmountComponentAtNode(div);
  const tree = renderer.create(<Filter />).toJSON();
  expect(tree).toMatchSnapshot();
});
