import { TOrder } from './order.interface';
import Order from './order.model';

const createOrder = async (order: TOrder) => {
  const result = await Order.create(order);
  return result;
};

const getOrders = async (queryEmail: string | undefined) => {
  const result = await Order.aggregate([
    queryEmail ? { $match: { email: queryEmail } } : { $match: {} },
  ]);
  return result;
};

export const orderService = {
  createOrder,
  getOrders,
};
