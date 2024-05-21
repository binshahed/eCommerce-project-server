import { Application, Request, Response } from 'express';
import { productRouter } from '../modules/product/product.router';
import { orderRouter } from '../modules/order/order.router';

const router = (app: Application) => {
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });

  app.use('/api/products', productRouter);
  app.use('/api/orders', orderRouter);

  app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route not found',
    });
  });
};

export default router;
