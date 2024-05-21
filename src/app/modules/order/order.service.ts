import { TOrder } from './order.interface';
import Order from './order.model';

const createOrder = async (order: TOrder) => {
  const result = await Order.create(order);
  return result;
};

export const orderService = {
  createOrder,
};
