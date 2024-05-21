import { Application } from 'express';
import { productRouter } from '../modules/product/product.router';
import { orderRouter } from '../modules/order/order.router';

const router = (app: Application) => {
  app.use('/api/products', productRouter);
  app.use('/api/orders', orderRouter);
};

export default router;
