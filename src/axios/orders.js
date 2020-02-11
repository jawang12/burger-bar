import axios from 'axios';

const ordersInstance = axios.create({
  baseURL: 'https://react-burgerbuilder-426c8.firebaseio.com/'
});

export default ordersInstance;
