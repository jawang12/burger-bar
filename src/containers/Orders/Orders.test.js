import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Orders } from './Orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

configure({ adapter: new Adapter() });

describe('<Orders/> container', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Orders
        orders={[{ key: 1, price: 2, ingredients: { salad: 0 } }]}
        thunkFetchOrders={() => {}}
      />
    );
  });

  it('renders Spinner component if page is loading', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });
  it('renders Order component if page is NOT loading', () => {
    expect(
      wrapper.contains(<Order key={1} ingredients={{ salad: 0 }} price={2} />)
    ).toEqual(true);
  });
});
