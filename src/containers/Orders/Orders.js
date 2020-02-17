import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios/orders';

class Orders extends Component {
  state = {
    loading: false,
    orders: []
  };

  componentDidMount() {
    this.getAndSetOrders();
  }

  getAndSetOrders = async () => {
    this.setState({ loading: true });

    try {
      const firebaseOrder = await axios.get('/orders.json');
      const orders = Object.keys(firebaseOrder.data).map(key => ({
        id: key,
        ...firebaseOrder['data'][key]
      }));
      this.setState({ loading: false, orders });
    } catch {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
