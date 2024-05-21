import { Application } from 'express';
import { productRouter } from '../modules/product/product.router';

const router = (app: Application) => {
  app.use('/api/products', productRouter);
};

export default router;
