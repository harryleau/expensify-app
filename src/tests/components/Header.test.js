import React from 'react';
import Header from '../../components/Header';
import { shallow } from 'enzyme';
// import ReactShallowRenderer from 'react-test-renderer/shallow';
// import toJSON from 'enzyme-to-json';

  /////// TESTING USING react-test-renderer - but it's not the best option => use enzyme as enzyme provides tons of testing methods.
  /*
  const renderer = new ReactShallowRenderer();

  renderer.render(<Header />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
  */

  /////// TESTING USING ENZYME
  // one more lib to install is enzyme-to-json, as default, the wrapper snapshot will be a bunch of values we dont need. toJSON will convert it into component snapshot just like renderer.getRenderOutput()
  // we can bootstrap toJSON by serializing snapshot in jest.config.json, now we dont need to import toJSON and use it in this file.

  ///// old lines
    /* 
    const wrapper = shallow(<Header />);
    expect(toJSON(wrapper)).toMatchSnapshot();
    */
  

///// New lines
test('should render Header correctly', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});