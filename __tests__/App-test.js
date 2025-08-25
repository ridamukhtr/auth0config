/**
 * @format
 */
import 'react-native'
import React from 'react';
// import ReactTestRenderer from 'react-test-renderer';
import App from '../App';
import renderer from 'react-test-renderer'

test('renders correctly', () => {
  const snapshot = renderer.create(<App />).toJSON();
  console.log("snpashot", snapshot);

  expect(snapshot).toMatchSnapshot()
});
