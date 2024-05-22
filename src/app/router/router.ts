import { Application, Request, Response } from 'express';
import { productRouter } from '../modules/product/product.router';
import { orderRouter } from '../modules/order/order.router';

const router = (app: Application) => {
  // root endpoint
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });

  // product endpoint
  app.use('/api/products', productRouter);
  // order endpoint
  app.use('/api/orders', orderRouter);

  // 404 endpoint
  app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route not found',
    });
  });
};

export default router;
