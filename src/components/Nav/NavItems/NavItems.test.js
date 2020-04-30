import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavItems from './NavItems';
import NavItem from './NavItem/NavItem';

configure({ adapter: new Adapter() });

describe('<NavItems />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavItems />);
  });

  it('should render two <NavItem /> elements if not authenticated', () => {
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });

  it('should have three <NavItem /> elements if we are authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavItem)).toHaveLength(3);
  });
  it('should have a logout link if we are authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.contains(<NavItem link="/logout">Logout</NavItem>)).toEqual(
      true
    );
  });
});
